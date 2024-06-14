import React from 'react';

function InputField  ({ value, onChange, placeholder })  {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="currency-selector"
    />
  );
};

export default InputField;
