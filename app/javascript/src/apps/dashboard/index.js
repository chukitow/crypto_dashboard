import React, { useState, useEffect, useRef } from 'react';
import useInterval from '../../hooks/useInterval';
import axios from 'axios';
import { isEmpty, first } from 'lodash';
import { List as ContentPlaceHolder } from 'react-content-loader';
import { mapDataToLineChart } from './helpers';
import LineChartCurrency from '../../shared/line_chart_currency';
import CurrencyTable from '../../shared/currency_table';
import CurrencyCalculator from '../../shared/currency_calculator';

const INITIAL_STATE = {
  BTC: [],
  ETH: [],
}
const Dashboard = () => {
  const interval = useRef();
  const [loaded, setLoading] = useState(false);
  const [currency, setCurrency] = useState(INITIAL_STATE);
  console.log(currency);

  async function fetchCurrency() {
    const { data } = await axios.get('/api/v1/currency')
    setCurrency({
      BTC: [{ ...data.BTC, time: new Date().toISOString() }, ...currency.BTC],
      ETH: [{ ...data.ETH, time: new Date().toISOString() }, ...currency.ETH],
    });
    setLoading(true);
  }

  useEffect(() => {
    fetchCurrency();
  }, []);

  useInterval(() => {
    fetchCurrency();
  }, 10000);


  return (
    <div className="container crypt-dashboard">
      <h2 className="text-center">CryptoCurrency Dashboard</h2>
      {
        !loaded &&
        <ContentPlaceHolder />
      }
      {
        loaded &&
        <>
          <div className="row">
            <div className="col-md-8">
              <LineChartCurrency
                data={[
                  {name: 'BTC', data: mapDataToLineChart(currency.BTC)},
                  {name: 'ETH', data: mapDataToLineChart(currency.ETH)},
                ]} />
            </div>
            <div className="col-md-4">
              <CurrencyCalculator
                rates={currency}
                currencies={['USD']}
                cryptos={['BTC']}
                />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {
                !isEmpty(currency.BTC) &&
                <>
                  <h3>1 BTC = {first(currency.BTC).USD} USD</h3>
                  <CurrencyTable
                    columns={[
                      { label: 'Time', accessor: 'time' },
                      { label: 'USD', accessor: 'USD' },
                      { label: 'EUR', accessor: 'EUR' },
                    ]}
                    data={currency.BTC}/>
                </>
              }
            </div>
            <div className="col-md-6">
              {
                !isEmpty(currency.ETH) &&
                <>
                <h3>1 ETH = {first(currency.ETH).USD} USD</h3>
                <CurrencyTable
                  columns={[
                    { label: 'Time', accessor: 'time' },
                    { label: 'USD', accessor: 'USD' },
                    { label: 'EUR', accessor: 'EUR' },
                    { label: 'BTC', accessor: 'BTC' },
                  ]}
                  data={currency.ETH}/>
                </>
              }
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Dashboard;
