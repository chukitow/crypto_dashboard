class Api::V1::CurrencyController < Api::V1::BaseController
  def index
    currencies = CryptoService.get
    render json: currencies
  end
end
