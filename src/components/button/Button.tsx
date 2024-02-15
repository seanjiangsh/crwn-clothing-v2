import React from "react";

import { BaseButton, GoogleButton, InvertedButton } from "./Button.styles";

type ButtonType = "google-sign-in" | "inverted";
type ButtonProps = {
  buttonType?: ButtonType;
  children: string | JSX.Element;
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

export default function Button(props: ButtonProps) {
  const { buttonType, children, ...otherProps } = props;
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
}
