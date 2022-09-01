
class OrderMailer < ApplicationMailer
  ADMIN_EMAIL = 'carcosaclub@gmail.com'

  def daily_update_email
    @user = params[:user]
    @notes = @user.notes_on_items.where(
      "item_notes.created_at >= ?", 1.day.ago)
    @status_changes = @user.status_changes_on_items.where(
      "status_changes.created_at >= ?", 1.day.ago)

    if (@notes.count == 0 && @status_changes.count == 0) 
      return;
    end

    mail(to: @user.email, subject: "Daily update on your Carcosa orders")
  end

end
