import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  type = "button",
  onClick,
  buttonStyle = "btn--primary",
  buttonSize = "btn--medium",
  children = "Get Started",
  to = null, // If 'to' is provided, button navigates
  className = "",
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  // If 'to' prop exists, render a Link instead of a button
  if (to) {
    return (
      <Link
        to={to}
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${className}`}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a normal button
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
