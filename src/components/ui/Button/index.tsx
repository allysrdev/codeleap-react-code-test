import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer bg-[#7695EC] text-white font-bold disabled:text-zinc-700 w-[111px] h-[32px] disabled:bg-zinc-300 disabled:cursor-not-allowed rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
