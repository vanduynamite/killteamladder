
class OrderMailer < ApplicationMailer

  def daily_update_email
    @user = params[:user]
    @notes = []
    # @user.notes_on_items.where(
    #   "item_notes.created_at >= ?", 1.day.ago)
    @status_changes = @user.status_changes_on_items.where(
      "status_changes.created_at >= ?", 1.day.ago)

    if (@notes.count == 0 && @status_changes.count == 0) 
      return
    end

    @status_updates = {}

    @status_changes.each do |s|
      new_status = s.new_status

      next unless new_status.complete
      next if s.item.purchased_in_store

      if !@status_updates[new_status.sort_num]
        @status_updates[new_status.sort_num] = {
          name: new_status.name,
          items: []
        }
      end
      @status_updates[new_status.sort_num][:items] << s.item.description
    end

    @status_keys = @status_updates.keys.sort

    if (@status_keys.count == 0)
      return
    end

    date_string = Date.today.strftime("%d%b%y")
    
    mail(
      to: @user.email, 
      subject: "Update on your Carcosa orders " + date_string,
    )
  end

end
