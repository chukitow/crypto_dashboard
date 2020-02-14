require 'net/http'

class CryptoService
  BASE_URL = 'https://min-api.cryptocompare.com/data/price'.freeze

  def self.get
    [btc, eth].reduce({}) do |memo, crypto|
      uri = URI(BASE_URL)
      uri.query = URI.encode_www_form(crypto.merge(access_token))
      response = Net::HTTP.get_response(uri)
      response_body = JSON.parse(response.body)
      memo[crypto[:fsym]] = response_body
      memo
    end
  end

  def self.btc
    { fsym: 'BTC', tsyms: 'USD,EUR'}
  end

  def self.eth
    { fsym: 'ETH', tsyms: 'USD,EUR,BTC'}
  end

   def self.access_token
     {
       access_token: Rails.application.credentials.cryptocompare[:access_token]
     }
   end
end
