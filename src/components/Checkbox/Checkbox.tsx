import type { InputHTMLAttributes } from "react";

import "./Checkbox.css";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({
  label,
  id,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <div className={`checkbox ${className}`}>
      <input type="checkbox" id={id} className="checkbox__input" {...props} />
      <label htmlFor={id} className="checkbox__label">
        {label}
      </label>
    </div>
  );
}
