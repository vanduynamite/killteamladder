
class Api::ItemNotesController < ApplicationController

  def create
    return false unless authorized_user? || ordermaster?

    user = current_user
    @items = OrderItem.where(id: item_note_params.item_id_list)
    @notes = []
    @items.each do |item|
      @notes << ItemNote.create(
        item: item,
        user: user,
        note: note,
      )
    end

    render 'api/item_notes/create.json.jbuilder'
  end

  # def destroy
  # # TODO: implement later
  # # Don't forget to add back into the route
  # end

  private

  def item_note_params
    params.require(:notes).permit(
      :note,
      :item_id_list,
    )
  end

end
