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
    resources :distributors, only: [:index]
    resources :order_statuses, only: [:index]
    resources :item_notes, only: [:create]
    resources :invoices, only: [:create]
    resources :shipments, only: [:create]
    resources :order_items, only: [:create, :index]
    get :new_items, to: 'orderitems#new_items'
    get :invoiced_items, to: 'orderitems#invoiced_items'
    get :ordered_items, to: 'orderitems#ordered_items'
    get :shipped_items, to: 'orderitems#shipped_items'
    get :complete_items, to: 'orderitems#complete_items'
    get :items_with_issue, to: 'orderitems#items_with_issue'
  end

end
