import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./Default";

interface DrawerPrimaryProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
}

const DrawerPrimary: React.FC<DrawerPrimaryProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="!p-0">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="pt-10">{children}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerPrimary;
