import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Default";
import { cn } from "@/lib/utils";

const DropDownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "text-sm font-medium text-gray-500 transition-all duration-200 outline-none hover:text-primary",
          isOpen && "text-primary"
        )}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-2 p-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuItem className="cursor-pointer">test</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">test</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">test</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">test</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
