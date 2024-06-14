const API_KEY = '21c3188649bc2c63476ccbdd';

export const getExchangeRate = (currency) => {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching exchange rates:', error);
      throw error;
    });
};


