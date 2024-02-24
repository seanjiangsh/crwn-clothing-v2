import React from "react";

import { Group, Input, InputLabel } from "./Form-input.styles";

type FormInputProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: FormInputProps) {
  const { label, ...otherProps } = props;
  const value = String(otherProps.value);
  const shrink = !!value.length;
  return (
    <Group>
      <Input {...otherProps} />
      <InputLabel shrink={shrink}>{label}</InputLabel>
    </Group>
  );
}
