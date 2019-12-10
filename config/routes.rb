Rails.application.routes.draw do
  devise_for :users
  root "group#index"
  resources :user, only: [:edit, :update]
  resources :group, only: [:new, :create, :edit, :update]
    resources :messages, only: [:index, :create]
  post "/group/new", to: "group#create"
end
