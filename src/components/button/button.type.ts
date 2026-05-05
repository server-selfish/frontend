import type { ComponentProps, PropsWithChildren, ReactNode } from "react";

type buttonSizeType =
  | "icon"
  | "default"
  | "sm"
  | "lg"
  | "icon-sm"
  | "icon-lg"
  | null;
type buttonVariantType =
  | "default"
  | "link"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | null;
export type IButtonWithIconProps = PropsWithChildren<
  {
    icon: ReactNode;
    variant?: buttonVariantType;
    buttonSize?: buttonSizeType;
    iconPosition?: "left" | "right";
    className?: string;
    buttonType?: "button" | "reset" | "submit" | "link";
    href?: string;
  } & ComponentProps<"button">
>;
