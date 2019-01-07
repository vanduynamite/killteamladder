
# GET    /api/teams(.:format)       api/teams#index {:format=>:json}
# POST   /api/teams(.:format)       api/teams#create {:format=>:json}
# GET    /api/teams/:id(.:format)   api/teams#show {:format=>:json}
# PATCH  /api/teams/:id(.:format)   api/teams#update {:format=>:json}

class Api::TeamsController < ApplicationController

  def create
    return false unless authorized_user?

    @user = current_user
    @team = @user.teams.new(team_params)

    if @team.save
      # render 'api/videos/show.json.jbuilder'
    else
      render json: @team.errors.full_messages, status: 422
    end

    # render json: {
    #   teams: {
    #     1: {
    #       id: 1,
    #       faction: 'Adeptus Mechanicus',
    #       teamName: 'Vigilus Strike Force IVV',
    #       ownerId: 1,
    #     }
    #   },
    #   users: {
    #     1: {
    #       id: 1,
    #       firstName: "Paul",
    #       lastName: "van Duyn"
    #     },
    #   },
    # }
  end

  def show

  end

  private

  def team_params
    params.require(:team).permit(
      :faction,
      :teamName,
    )
  end

end
