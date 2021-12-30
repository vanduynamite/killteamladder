
class Api::ShipmentsController < ApplicationController

  def create
    return false unless ordermaster?
    user = current_user

    @items = OrderItem.where(id: item_note_params.item_id_list)

    # check to make sure the items are all in a valid state
    invalid_items = @items.where(
      status: OrderStatus.find_by(
        search_name: [
          "awaiting_invoice",
          "delivered",
          "refunded",
        ]
      )
    )
    unless invalid_items.empty?
      render json: ['Some of these items are in an invalid status'], status: 422
      return
    end

    @shipment = Shipment.create(
      tracking_num: invoice_params.tracking_num,
      distributor_id: invoice_params.distributor_id,
      distributor_invoice: invoice_params.distributor_invoice,
    )
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
        shipment_id: invoice.id,
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
      :item_id_list,
    )
  end

end
