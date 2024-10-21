"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface LayoutPrimaryProps {
  children: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
}

const LayoutPrimary: React.FC<LayoutPrimaryProps> = ({
  children,
  navbar,
  sidebar,
  footer,
}) => {
  return (
    <div
      className={cn(
        "w-screen flex flex-col  max-w-screen dark:bg-[#040D12]  overflow-x-hidden"
      )}
    >
      {navbar && <div className="w-full">{navbar}</div>}
      <div className="flex">
        {sidebar ?? ""}
        <div className="w-full min-h-screen overflow-x-hidden px-4  overflow-y-auto flex flex-col pb-16 max-w-[1440px]">
          {children}
        </div>
      </div>
      {footer && <div className="w-full">{footer}</div>}
    </div>
  );
};

export default LayoutPrimary;
