import React, { FC, memo } from "react";

import {
  BaseButton,
  GoogleButton,
  InvertedButton,
  ButtonSpinner,
} from "./Button.styles";

type ButtonType = "google-sign-in" | "inverted";
type ButtonProps = {
  buttonType?: ButtonType;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType?: ButtonType) => {
  switch (buttonType) {
    case "google-sign-in":
      return GoogleButton;
    case "inverted":
      return InvertedButton;
    default:
      return BaseButton;
  }
};

const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const { buttonType, isLoading, children, ...otherProps } = props;
  const CustomButton = getButton(buttonType);
  const otherAttr = { "button-type": buttonType || "" };
  return (
    <CustomButton {...otherProps} {...otherAttr}>
      {isLoading ? <ButtonSpinner data-testid="spinner" /> : children}
    </CustomButton>
  );
});

export default Button;
