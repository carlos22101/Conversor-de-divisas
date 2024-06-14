import React, { useState, useEffect } from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import CurrencySelector from '../molecules/CurrencySelector';
import { getExchangeRate } from '../services/exchangeService';
import Swal from 'sweetalert2';

function ConverterForm  ()  {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    function fetchCurrencies ()  {
      getExchangeRate('USD')
        .then((data) => {
          setCurrencies(Object.keys(data.conversion_rates));
        })
        .catch((error) => {
          console.error('Error fetching exchange rates:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error al recibir los datos ',
          });
        });
    };

    fetchCurrencies();
  }, []);

  const handleConvert = () => {
    if (amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'cantidad invalida',
        text: 'El valor debe ser mayor a 0',
      });
      return;
    }

    getExchangeRate(fromCurrency)
      .then((data) => {
        const rate = data.conversion_rates[toCurrency];
        setResult(amount * rate);
        Swal.fire({
          icon: 'success',
          title: 'Conversion exitosa ',
          text: `${amount} ${fromCurrency} = ${amount * rate} ${toCurrency}`,
        });
      })
      .catch((error) => {
        console.error('error al convertir :', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'error al convertir ',
        });
      });
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setAmount(value);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'cantidad invalida',
        text: 'La cantidad debe ser mayor a 0',
      });
    }
  };

  return (
    <div className="converter-form">
      <InputField value={amount} onChange={handleAmountChange} placeholder="Amount" />
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      />
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      />
      <Button onClick={handleConvert}>Convertir</Button>
      {result !== null && (
        <div className="result">
          {amount} {fromCurrency} = {result} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default ConverterForm;
