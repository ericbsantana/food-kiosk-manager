import { ComponentPropsWithoutRef, FC } from "react";

export const Button: FC<ComponentPropsWithoutRef<"button">> = ({
  children,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} className="button">
      {children}
    </button>
  );
};
