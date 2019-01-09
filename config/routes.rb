Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resources :teams, only: [:create, :show, :index, :update]
    resources :matchups, only: [:create, :update, :destroy]
    resource :session, only: [:create, :destroy]
  end

end
