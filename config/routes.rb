Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    patch :passwordreset, to: 'users#password_reset'
    patch :authorizeleague, to: 'users#authorize_2020_league'
    resources :teams, only: [:create, :show, :index, :update]
    resources :matchups, only: [:show, :create, :update, :destroy]
    resources :approved_email, only: [:create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :factions, only: [:index]
    resources :seasons, only: [:create]
    resources :bb_players, only: [:create, :update, :show]
    resources :bb_teams, only: [:show]
    resources :bb_advancements, only: [:create, :index]
  end

end
