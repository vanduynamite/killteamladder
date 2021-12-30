
class Api::OrderStatusesController < ApplicationController

  def index
    @statuses = OrderStatus.all

    render 'api/order_statuses/index.json.jbuilder'
  end

end
