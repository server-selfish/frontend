import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import type { IButtonWithIconProps } from "./button.type";

export const ButtonWithIcon = ({
  children,
  icon,
  iconPosition = "left",
  variant,
  buttonSize,
  buttonType,
  className,
  href,
  ...buttonProps
}: IButtonWithIconProps) => {
  return (
    <>
      {buttonType !== "link" ? (
        <Button
          className={className}
          size={buttonSize}
          variant={variant}
          type={buttonType}
          {...buttonProps}
        >
          {iconPosition === "left" && icon}
          {children}
          {iconPosition === "right" && icon}
        </Button>
      ) : (
        <>
          <Link to={href}>
            <Button
              className={className}
              size={buttonSize}
              variant={variant}
              type={"button"}
              {...buttonProps}
            >
              {iconPosition === "left" && icon}
              {children}
              {iconPosition === "right" && icon}
            </Button>
          </Link>
        </>
      )}
    </>
  );
};
