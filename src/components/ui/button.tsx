import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-accent-indigo to-accent-violet text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        playful:
          "bg-gradient-to-r from-accent-coral to-pastel-pink-dark text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        secondary:
          "bg-white/80 backdrop-blur-sm border border-cream-300 text-cream-700 hover:bg-white hover:border-cream-400 shadow-sm",
        outline:
          "border-2 border-cream-300 bg-transparent hover:bg-cream-100 hover:border-accent-indigo text-cream-700",
        ghost:
          "hover:bg-cream-100 text-cream-700",
        pastel:
          "bg-pastel-purple text-accent-violet hover:bg-pastel-purple-dark/30 border border-pastel-purple-dark/30",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
