import React from "react";

import { Group, FormInput, FormInputLabel } from "./FormInput.styles";

type InputProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  const { label, ...otherProps } = props;
  const value = String(otherProps.value);
  const shrink = value.length ? "shrink" : "";
  return (
    <Group>
      <FormInput {...otherProps} />
      <FormInputLabel shrink={shrink}>{label}</FormInputLabel>
    </Group>
  );
}
