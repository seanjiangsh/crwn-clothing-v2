import React from "react";

import "./Button.css";

type ButtonProps = {
  buttonType?: "google-sign-in" | "inverted";
  children: string | JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  const { buttonType, children, ...otherProps } = props;
  const btnClass = `button-container ${buttonType}`;
  return (
    <button className={btnClass} {...otherProps}>
      {children}
    </button>
  );
}
