Rails.application.routes.draw do
  devise_for :users
  root "group#index"
  resources :user, only: [:index, :edit, :update]
  resources :group, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  post "/group/new", to: "group#create"
end
