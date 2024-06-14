import React from 'react';

function CurrencySelector  ({ currencies, selectedCurrency, onChange })  {
  return (
    <select value={selectedCurrency} onChange={onChange} className="currency-selector">
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
