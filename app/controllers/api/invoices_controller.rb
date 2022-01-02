
class Api::InvoicesController < ApplicationController

  def create
    return false unless ordermaster?
    user = current_user

    @items = OrderItem.where(id: invoice_params[:item_id_list])

    # check to make sure all items belong to the same user
    num_users = User.where(items: @items).count
    unless num_users == 1
      render json: ['Not all of these items belong to the same user'], status: 422
      return
    end

    # check to make sure the item has not already been invoiced
    invalid_items = @items.where.not(status: OrderStatus.where(search_name: "awaiting_invoice"))
    unless invalid_items.empty?
      render json: ['Not all of these items are awaiting invoice'], status: 422
      return
    end

    @invoice = Invoice.new(
      carcosa_id: invoice_params[:carcosa_id],
      square_id: invoice_params[:square_id],
    )
    if !@invoice.save
      render json: @invoice.errors.full_messages, status: 422
      return false
    end
    @items.each_with_index do |item, i|
      new_status = item.purchased_in_store ?
        OrderStatus.find_by(search_name: "delivered") :
        OrderStatus.find_by(search_name: "awaiting_order")
      old_status = item.status

      StatusChange.create(
        item: item,
        old_status: old_status,
        new_status: new_status,
        user: user,
      )

      item.update(
        status: new_status,
        invoice_id: @invoice.id,
        invoice_item_num: i + 1,
      )
    end

    render 'api/invoices/create.json.jbuilder'
  end

  # def destroy
  # # TODO: implement later
  # # Don't forget to add back into the route
  # end

  private

  def invoice_params
    params.require(:invoice).permit(
      :carcosa_id,
      :square_id,
      :item_id_list => [],
    )
  end

end
