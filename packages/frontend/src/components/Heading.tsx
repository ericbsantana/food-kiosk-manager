import { FC, ReactNode } from "react";

export const Heading: FC<{ children: ReactNode; bold?: boolean }> = ({
  children,
  bold,
}) => (
  <h1 className={`text-center text-4xl ${bold ? "font-bold" : ""}`}>
    {children}
  </h1>
);
