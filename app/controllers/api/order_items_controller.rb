
class Api::OrderItemsController < ApplicationController

  def index
    user = current_user
    @items = OrderItem.where(user: user).includes(:distributor, :status, :notes)
    render 'api/order_items/index.json.jbuilder'
  end

  def create
    user = current_user

    names = new_order_items_params.name_list
    quantities = new_order_items_params.quantity_list
    notes = new_order_items_params.note_list
    purchased_in_store = order_item_params.purchased_in_store

    if names.length != quantities.length || names.length != notes.length
      render json: ['Mismatch on length of item data'], status: 422
      return
    end

    @items = []

    distributor = Distributor.find_by(name: "Unknown")
    status = OrderStatus.find_by(search_name: "awaiting_invoice")
    names.each_with_index do |_, i|
      item = OrderItem.create(
        user: user,
        name: names[i],
        quantity: quantities[i],
        distributor: distributor,
        status: status,
        purchased_in_store: purchased_in_store,
      )

      note = notes[i]
      ItemNote.create(item: item, user: user, note: note) if note != ''

      @items << item
    end

    render 'api/order_items/create.json.jbuilder'
  end

  def update
    return false unless authorized_user? || ordermaster?

    item_ids = update_order_items_params.item_id_list
    name = update_order_items_params.name
    quantity = update_order_items_params.quantity
    distributor = Distributor.find(update_order_items_params.distributor_id)
    status = OrderStatus.find(update_order_items_params.status_id)
    purchased_in_store = update_order_items_params.purchased_in_store
    note = update_order_items_params.note
    item_code = update_order_items_params.item_code


    # don't allow update to certain statuses (invoice, ship)
    # probably don't allow update FROM certain statuses
    # maybe make a map of to:from, if it doesn't fit then get out

    # don't allow certain changes unless an ordermaster
    # some status changes are OK

    # if not a valid distributor or status, kill it


    @items = OrderItems.where(id: item_ids)

    @items.update(name: name) if name
    @items.update(quantity: quantity) if quantity
    @items.update(distributor: distributor) if distributor
    @items.update(status: status) if status
    @items.update(purchased_in_store: purchased_in_store) if purchased_in_store
    @items.update(item_id: item_code) if item_code


    render 'api/order_items/update.json.jbuilder'
  end

  def invoiced_items
    ordermaster_index([
      "awaiting_order",
      "awaiting_preorder",
      "preordered",
      "backordered",
    ])
  end

  def new_items
    ordermaster_index(["awaiting_invoice"])
  end

  def ordered_items
    ordermaster_index(["ordered"])
  end

  def shipped_items
    ordermaster_index(["shipped"])
  end

  def complete_items
    ordermaster_index(["refunded", "delivered"])
  end

  def items_with_issue
    ordermaster_index(["awaiting_refund", "unknown"])
  end

  private

  def ordermaster_index(statuses)
    return false unless ordermaster?
    @items = OrderItem.where(status:
      OrderStatus.find_by(search_name: statuses))
        .includes(:distributor, :status, :notes)
    render 'api/order_items/index.json.jbuilder'
  end

  def new_order_items_params
    params.require(:new_order_items).permit(
      :name_list,
      :quantity_list,
      :item_note_list,
      :purchased_in_store,
    )
  end

  def update_order_items_params
    params.require(:update_order_items).permit(
      :item_id_list,
      :name,
      :quantity,
      :distributor_id,
      :status_id,
      :purchased_in_store,
      :note,
      :item_code,
    )
  end

end
