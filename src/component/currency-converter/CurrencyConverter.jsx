import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import { CurrencyForm } from "./CurrencyForm";

const CurrencyConverter = () => {
  const [currencies, updateCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    getAllCurrencies();
  }, []);

  const getConvertedAmount = async (event, baseCurrency, finalCurrency, amount) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`);
      const data = await response.json();
      const rate = data[baseCurrency]?.[finalCurrency];
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(`${amount} ${baseCurrency} = ${result} ${finalCurrency}`);
      setLoading(false);
    } catch (e) {
      setConvertedAmount(0);
    }
  };

  const getAllCurrencies = async () => {
    try {
      const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
      const data = await response.json();
      updateCurrencies(data ? [...Object.keys(data)] : []);
    } catch (error) {
      updateCurrencies([]);
    }
  };

  return (
    <div className="currency-container">
      <h1 className="title">Currency converter</h1>
      <CurrencyForm currencies={currencies} getConvertedAmount={getConvertedAmount} loading={loading} />
      <div className="converted-amount-block">
        <h2>Converted Amount:</h2>
        <p>{convertedAmount}</p>
      </div>
    </div>
  );
};

export { CurrencyConverter };
