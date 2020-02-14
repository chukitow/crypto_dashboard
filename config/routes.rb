Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :currency, only: [:index]
    end
  end

  root 'dashboard#index'
end
