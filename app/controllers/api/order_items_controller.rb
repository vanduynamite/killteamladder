
class Api::OrderItemsController < ApplicationController

  def index
    return false unless authorized_user?
    @user = current_user
    @items = OrderItem.where(user: @user).includes(:notes)
    render 'api/order_items/index.json.jbuilder'
  end

  def create
    return false unless authorized_user?
    @user = current_user

    names = new_order_items_params[:name_list]
    quantities = new_order_items_params[:quantity_list]
    notes = new_order_items_params[:note_list]
    purchased_in_store = ActiveModel::Type::Boolean.new.cast(
      new_order_items_params[:purchased_in_store]) || false

    if names.length != quantities.length || names.length != notes.length
      render json: ['Mismatch on length of item data'], status: 422
      return
    end

    @items = []

    distributor = Distributor.find_by(name: "Unknown distributor")
    status = OrderStatus.find_by(search_name: "awaiting_invoice")
    names.each_with_index do |_, i|
      item = OrderItem.create(
        user: @user,
        name: names[i],
        quantity: quantities[i].to_i,
        distributor: distributor,
        status: status,
        purchased_in_store: purchased_in_store,
      )

      note = notes[i]
      ItemNote.create(item: item, user: @user, note: note) if note != ''

      @items << item
    end

    render 'api/order_items/index.json.jbuilder'
  end

  def update
    return false unless authorized_user? || ordermaster?

    @user = current_user

    item_ids = update_order_items_params[:item_id_list]
    name = update_order_items_params[:name]
    quantity = update_order_items_params[:quantity]

    distributor_id = update_order_items_params[:distributor_id]
    distributor = Distributor.find(distributor_id) if distributor_id

    status_id = update_order_items_params[:status_id]
    status = OrderStatus.find(status_id) if status_id

    purchased_in_store = update_order_items_params[:purchased_in_store] ?
      ActiveModel::Type::Boolean.new.cast(update_order_items_params[:purchased_in_store]) :
      nil;
    item_code = update_order_items_params[:item_code]

    @items = OrderItem.where(id: item_ids)
    # if not a valid distributor or status, kill it
    # TODO: I forget how the data comes in from the front-end

    # don't allow certain status changes, and check ordermaster capabilities too
    if status && !all_items_can_update_to_new_status(status)
      return false
    end

    @items.update(name: name) if name != ""
    @items.update(quantity: quantity) if quantity != ""
    @items.update(distributor: distributor) if distributor
    @items.update(purchased_in_store: purchased_in_store) if purchased_in_store != nil
    @items.update(item_code: item_code) if item_code != ""
    if status
      user = current_user
      @items.each do |item|
        old_status = item.status
        StatusChange.create(
          item: item,
          old_status: old_status,
          new_status: status,
          user: user,
        )
      end
      @items.update(status: status)
    end

    render 'api/order_items/index.json.jbuilder'
  end

  def new_items
    ordermaster_index(["awaiting_invoice"])
  end

  def invoiced_items
    ordermaster_index([
      "awaiting_order",
      "awaiting_preorder",
      "preordered",
      "backordered",
    ])
  end

  def ordered_items
    ordermaster_index(["ordered"])
  end

  def shipped_items
    ordermaster_index(["shipped"])
  end

  def completed_items
    ordermaster_index(["refunded", "delivered"])
  end

  def items_with_issue
    ordermaster_index(["awaiting_refund", "unknown"])
  end

  private

  def ordermaster_index(statuses)
    if !ordermaster?
      render json: ['Unauthorized'], status: 401
      return false
    end
    @user = current_user
    @ordermaster = true
    @items = OrderItem
      .where(status: OrderStatus.where(search_name: statuses))
      .includes(:notes)
    render 'api/order_items/index.json.jbuilder'
  end

  def all_items_can_update_to_new_status(new_status)
    acceptable_status_change_links = @user.ordermaster ?
      AcceptableStatusChange.where(change_to: new_status) :
      AcceptableStatusChange.where(change_to: new_status, ordermaster_only: false)
    acceptable_from_statuses = OrderStatus.where(acceptable_status_change_links: acceptable_status_change_links)
    all_from_statuses = OrderStatus.where(order_items: @items)
    unacceptable_statuses = all_from_statuses - acceptable_from_statuses

    return true if unacceptable_statuses.empty?

    render json: ['Not all items can be updated to the new status'], status: 422
    return false
  end

  def new_order_items_params
    params.require(:items).permit(
      :purchased_in_store,
      :name_list => [],
      :quantity_list => [],
      :note_list => [],
    )
  end

  def update_order_items_params
    params.require(:items).permit(
      :name,
      :quantity,
      :distributor_id,
      :status_id,
      :purchased_in_store,
      :item_code,
      :item_id_list => [],
    )
  end

end
