import React from "react";

import "./FormInput.css";

type InputProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  const { id, label, ...otherProps } = props;
  const value = String(otherProps.value);
  const shrink = value.length ? "shrink" : "";
  const labelClass = `${shrink} form-input-label`;

  return (
    <div className="group">
      <input className="form-input" id={id} {...otherProps} />
      <label className={labelClass}>{label}</label>
    </div>
  );
}
