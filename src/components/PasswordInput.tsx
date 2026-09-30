"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Password box with an eye button that shows or hides what was typed.
export function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [shown, setShown] = useState(false);
  const Icon = shown ? EyeOff : Eye;
  return (
    <div className="relative">
      <Input {...props} type={shown ? "text" : "password"} className={`${className ?? ""} pr-11`} />
      <button
        type="button"
        onClick={() => setShown(!shown)}
        aria-label={shown ? "Hide password" : "Show password"}
        aria-pressed={shown}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-fog hover:text-lilac focus-visible:text-lilac focus-visible:outline-none"
      >
        <Icon className="size-4" />
      </button>
    </div>
  );
}
