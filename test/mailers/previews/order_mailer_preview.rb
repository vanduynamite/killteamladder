# Preview all emails at http://localhost:3000/rails/mailers/order_mailer
class OrderMailerPreview < ActionMailer::Preview
  def new_note_email
    item = OrderItem.new(
      name: 'itemname', 
      user: User.first, 
      distributor: Distributor.second,
      quantity: 1,
      status: OrderStatus.first,
    )
    note = "I'm a note"

    OrderMailer.with(item: item, note: note).new_note_email
  end

  def daily_update_email
    # user = User.first # paul.vanduyn@gmail.com
    user = User.second # isaac@carcosa.com
    OrderMailer.with(user: user).daily_update_email
  end
end
