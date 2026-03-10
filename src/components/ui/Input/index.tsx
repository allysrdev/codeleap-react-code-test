import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: HTMLInputElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <input
          ref={ref}
          id={id}
          className="border text-sm border-gray-400 p-1.5! w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
