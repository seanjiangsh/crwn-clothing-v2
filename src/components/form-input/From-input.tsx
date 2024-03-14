import React from "react";

import { Group, Input, InputLabel } from "./Form-input.styles";

type FormInputProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: FormInputProps) {
  const { id, label, ...otherProps } = props;
  const value = String(otherProps.value);
  const shrink = value.length ? "true" : undefined;

  return (
    <Group>
      <Input id={id} data-testid={id} {...otherProps} />
      <InputLabel htmlFor={id} shrink={shrink}>
        {label}
      </InputLabel>
    </Group>
  );
}
