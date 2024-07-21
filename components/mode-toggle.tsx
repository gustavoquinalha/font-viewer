"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme: setThemeModule, resolvedTheme } = useTheme();
  const [theme, setTheme] = React.useState(resolvedTheme || "system");

  const handleToggleTheme = (value: string) => {
    setThemeModule(value);
    setTheme(value);
  };

  React.useEffect(() => {
    setTheme(resolvedTheme || "system");
  }, [resolvedTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Sun className="h-[1.2rem] w-[1.2rem] block dark:hidden" />
        <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-40">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(theme) => handleToggleTheme(theme)}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
