'use client';

import { useEffect, useState } from 'react';
import { FormLabel } from './form';
import { OptionFields } from './select-field';

type RadioFieldProps = {
  label?: string;
  options: OptionFields;
  value?: string;
  onChange?: (value: string) => void;
}

export default function RadioField({
  label,
  options,
  value,
  onChange,
}: RadioFieldProps) {
   // 初期値として `value` を設定
   const [selectedValue, setSelectedValue] = useState(value);

   // `value` が変更された場合に `selectedValue` を更新
   useEffect(() => {
     setSelectedValue(value);
   }, [value]);

   const handleChange = (newValue: string) => {
     setSelectedValue(newValue);
     onChange?.(newValue);
   };
  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <div>
      {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={option.value}
              value={option.value}
              name="unique-radio-group"
              checked={selectedValue === option.value}
              onChange={() => {
                handleChange(option.value)
              }}
              className="cursor-pointer"
            />
            <label htmlFor={option.value} className="cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
