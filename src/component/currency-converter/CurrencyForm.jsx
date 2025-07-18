import { useState } from "react";

const CurrencyForm = ({ currencies, getConvertedAmount, loading = false }) => {
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [finalCurrency, setFinalCurrency] = useState("");

  const handleCurrencyConvert = (event) => {
    if (amount <= 0) {
      alert("Please enter valid amount");
      return;
    }
    if (!baseCurrency || !finalCurrency) {
      alert("Please select currencies");
      return;
    }
    getConvertedAmount(event, baseCurrency, finalCurrency, amount);
  };

  return (
    <div className="currency-form">
      <div className="form-inputs">
        <div className="input-block">
          <label>Amount</label>
          <input id="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>

        <div className="input-block">
          <label>From</label>
          <select id="baseCurrency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            <option value="">Select currency</option>
            {currencies.length > 0 &&
              currencies.map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
          </select>
        </div>

        <div className="input-block" style={{ justifyContent: "center", fontWeight: "bold" }}>
          X
        </div>

        <div className="input-block">
          <label>To</label>
          <select id="finalCurrency" value={finalCurrency} onChange={(e) => setFinalCurrency(e.target.value)}>
            <option value="">Select currency</option>
            {currencies.length > 0 &&
              currencies.map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button onClick={handleCurrencyConvert} className="convert-button" disabled={loading}>
        Convert
      </button>
    </div>
  );
};

export { CurrencyForm };
