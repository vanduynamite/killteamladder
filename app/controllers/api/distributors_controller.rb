
class Api::DistributorsController < ApplicationController

  def index
    @distributors = Distributor.all

    render 'api/distributors/index.json.jbuilder'
  end

end
