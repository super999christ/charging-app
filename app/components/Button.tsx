import React, { ReactNode } from "react";
import Spinner from "./Spinner";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  loading?: boolean;
  iconLeft?: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children, loading, iconLeft, className, disabled, ...rest } = props;

  return (
    <button
      disabled={disabled || loading}
      className={`${className} w-full max-w-[350px] px-10 py-2.5 bg-black text-white py-5 text-center inline-flex justify-center items-center rounded uppercase font-semibold hover:bg-nxu-charging-blackalpha disabled:bg-nxu-charging-disabled`}
      {...rest}
    >
      {loading !== undefined && loading && <Spinner className="w-7 h-7 mr-5" />}
      {iconLeft && !loading && <span className="mr-2">{iconLeft}</span>}
      {children}
    </button>
  );
}
