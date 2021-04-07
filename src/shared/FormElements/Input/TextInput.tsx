import React from "react";
import classnames from "classnames";

import styles from "./TextInput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  inputStyle?: "plain";
  variant?: "primary" | "secondary";
  className?: string;
  // size?: "sm" | "md" | "lg";
}

export const TextInput: React.FunctionComponent<Props> = ({
  block = false,
  inputStyle = "plain",
  variant = "primary",
  children,
  className,
  disabled,
  type = "text",
  // size = "md",
  ...props
}: Props) => {
  const { 
    placeholder = "Type here...",
    name,
    id 
  } = props
  const classes = classnames(
    styles.textInputContainer,
    // styles[size],
    {
      [styles.primary]: variant === "primary",
      [styles.block]: block === true,
      [styles.colorPrimary]:
        variant === "primary",
        // (buttonStyle === "outlined" || buttonStyle === "plain"),
      [styles.colorSecondary]:
        variant === "secondary",
        // (buttonStyle === "outlined" || buttonStyle === "plain"),
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <div className={classes} {...props} >
      <label htmlFor={id}>{name}</label>
      <input type={type} placeholder={placeholder} name={name} id={id} />
    </div>
  );
};
