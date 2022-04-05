
class Api::ShipmentsController < ApplicationController

  def create
    return false unless ordermaster?
    user = current_user

    @items = OrderItem.where(id: shipment_params[:item_id_list])

    # check to make sure the items are all in a valid state
    invalid_items = @items.where(
      status: OrderStatus.where(
        search_name: [
          "awaiting_invoice",
          "shipped",
          "delivered",
          "refunded",
        ]
      )
    )
    unless invalid_items.empty?
      render json: ['Some of these items are in an invalid status'], status: 422
      return false
    end

    unknown_distributor = Distributor.find_by(name: "Unknown distributor")
    distributor_id = shipment_params[:distributor_id] ?
      shipment_params[:distributor_id].to_i :
      unknown_distributor.id

    if distributor_id != unknown_distributor.id
      distributors = Distributor.where(items: @items)
        .where.not(id: unknown_distributor.id)

      if distributors.length > 1
        render json: ['Not all the items on this shipment are from the same distributor'], status: 422
        return false
      end

      if distributors.length == 1 && distributors[0].id != distributor_id
        render json: ['The items on this shipment are for the wrong distibutor'], status: 422
        return false
      end
    end

    @shipment = Shipment.new(
      tracking_num: shipment_params[:tracking_num],
      distributor_id: distributor_id,
      distributor_invoice: shipment_params[:distributor_invoice],
    )

    if !@shipment.save
      render json: @shipment.errors.full_messages, status: 422
      return false
    end

    new_status = OrderStatus.find_by(search_name: "shipped")
    @items.each do |item|
      old_status = item.status

      StatusChange.create(
        item: item,
        old_status: old_status,
        new_status: new_status,
        user: user,
      )

      item.update(
        status: new_status,
        shipment_id: @shipment.id,
      )
    end

    render 'api/shipments/create.json.jbuilder'
  end

  private

  def shipment_params
    params.require(:shipment).permit(
      :tracking_num,
      :distributor_id,
      :distributor_invoice,
      :item_id_list => [],
    )
  end

end
