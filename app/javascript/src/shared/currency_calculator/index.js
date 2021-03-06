import React, { useState, useEffect, useCallback }from 'react';
import { first } from 'lodash';

const CurrencyCalculator = ({
  currencies = [],
  cryptos = [],
  rates
}) => {
  const [currency, setCurrency] = useState(first(currencies))
  const [currentCrypto, setCrypto] = useState(first(cryptos))
  const [values, setValues] = useState({ currency: 0, crypto: 1 });
  const currentRate = Number(first(rates[currentCrypto])[currency]);

  useEffect(() => {
    setValues({
      currency: currencyToCrypo(values.currency),
      crytpo: cryptoToCurrency(values.crypto)
    });
  }, [
    currency,
    currentCrypto,
    setValues,
  ]);

  function currencyToCrypo(currency) {
    if(currency) {
      const conversion = currency / currentRate;
      setValues({ currency, crypto: conversion });
      return currency;
    }
    else {
      setValues({ currency: 0, crypto: 0 });
      return currentRate;
    }
  }

  function cryptoToCurrency(crypto) {
    if(crypto) {
      const conversion = crypto * currentRate;
      setValues({ currency: conversion, crypto });
      return crypto;
    }
    else {
      setValues({ currency: 0, crypto: 0 });
      return 0;
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Calculator</h5>
        <form>
          <div className="row">
            <div className="form-group col-6">
              <input
                onChange={(e) => currencyToCrypo(Number(e.target.value) || 0)}
                value={values.currency}
                className="form-control"
                type="text"/>
            </div>
            <div className="form-group col-6">
              <select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="form-control"
                value={currency}>
                {currencies.map((currency) => (
                  <option value={currency} key={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <input
                onChange={(e) => cryptoToCurrency(Number(e.target.value) || 0)}
                value={values.crypto}
                className="form-control"
                type="text"/>
            </div>
            <div className="form-group col-6">
              <select
                onChange={(e) => {
                  setCrypto(e.target.value);
                }}
                value={currentCrypto}
                className="form-control">
                {cryptos.map((crypto) => (
                  <option value={crypto} key={crypto}>{crypto}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
