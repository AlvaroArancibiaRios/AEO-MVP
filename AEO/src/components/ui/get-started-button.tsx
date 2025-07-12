import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type GetStartedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSize?: number;
  iconStrokeWidth?: number;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

const GetStartedButton = React.forwardRef<
  HTMLButtonElement,
  GetStartedButtonProps
>((props, ref) => {
  const {
    className,
    size = "lg",
    variant = "default",
    children = "Get Started",
    iconSize = 16,
    iconStrokeWidth = 2,
    ...restProps
  } = props;

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg"
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...restProps}
    >
      <span className="mr-8 transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
      <span
        className="absolute right-1 top-1 bottom-1 rounded-lg z-10 flex items-center justify-center w-1/4 transition-all duration-300 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95"
        aria-hidden="true"
      >
        <ChevronRight size={iconSize} strokeWidth={iconStrokeWidth} />
      </span>
    </button>
  );
});

GetStartedButton.displayName = "GetStartedButton";

export { GetStartedButton };