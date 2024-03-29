# == Schema Information
#
# Table name: order_items
#
#  id                   :bigint(8)              not null, primary key
#  user_id              :integer                not null
#  name                 :string                 not null
#  quantity             :integer                not null
#  distributor_id       :integer                not null
#  status_id            :integer                not null
#  purchased_in_store   :boolean
#  invoice_id           :integer
#  invoice_item_num     :integer
#  shipment_id          :integer
#  item_code            :string
#  created_at           :datetime               not null
#  updated_at           :datetime               not null
#

class OrderItem < ApplicationRecord
  validates :user_id, :quantity, :name, :status_id, :distributor_id , presence: true

  belongs_to :user
  belongs_to :distributor
  belongs_to :status,
    class_name: :OrderStatus,
    foreign_key: :status_id

  has_many :notes,
    class_name: :ItemNote,
    foreign_key: :order_item_id,
    dependent: :destroy

  has_many :status_changes,
    class_name: :StatusChange,
    foreign_key: :order_item_id,
    dependent: :destroy

  def invoice
    self.invoice_id ? Invoice.find(self.invoice_id) : nil
  end

  def carcosa_num
    self.invoice ? invoice.carcosa_id : nil
  end

  def carcosa_num_item
    self.invoice ? invoice.carcosa_id + "." + invoice_item_num : nil
  end

  def shipment
    self.shipment_id ? Shipment.find(self.shipment_id) : nil
  end

  def description
    self.quantity.to_s + "x " + self.name
  end

end
