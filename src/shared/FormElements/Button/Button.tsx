import React from "react";
import classnames from "classnames";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  buttonStyle?: "filled" | "outlined" | "plain";
  variant?: "primary" | "secondary";
  text?: string;
  className?: string;
  endIcon?: React.ReactNode;
  startIcon?: any;
  size?: "sm" | "md" | "lg";
}

export const Button: React.FunctionComponent<Props> = ({
  block = false,
  buttonStyle = "filled",
  variant = "primary",
  children,
  text,
  className,
  endIcon: EndIcon,
  disabled,
  type = "button",
  startIcon,
  size = "md",
  ...props
}: Props) => {
  const classes = classnames(
    styles.button,
    styles[size],
    {
      [styles.primary]: variant === "primary",
      [styles.secondary]: variant === "secondary",
      [styles.outlined]: buttonStyle === "outlined",
      [styles.plain]: buttonStyle === "plain",
      [styles.block]: block === true,
      [styles.colorPrimary]:
        variant === "primary" &&
        (buttonStyle === "outlined" || buttonStyle === "plain"),
      [styles.colorSecondary]:
        variant === "secondary" &&
        (buttonStyle === "outlined" || buttonStyle === "plain"),
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <button className={classes} {...props} type={type}>
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      <span className={styles.content}>{text || children}</span>
      <span className={styles.endIcon}>{EndIcon}</span>
    </button>
  );
};
