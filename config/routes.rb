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
    resources :item_notes, only: [:create]
    resources :invoices, only: [:create]
    resources :shipments, only: [:create]
    resources :order_items, only: [:create, :index]
    patch :order_items, to: 'order_items#update'
    get :new_items, to: 'order_items#new_items'
    get :invoiced_items, to: 'order_items#invoiced_items'
    get :ordered_items, to: 'order_items#ordered_items'
    get :shipped_items, to: 'order_items#shipped_items'
    get :completed_items, to: 'order_items#completed_items'
    get :items_with_issue, to: 'order_items#items_with_issue'
  end

end
