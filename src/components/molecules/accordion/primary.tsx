import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./default";

interface AccordionPrimaryProps {
  title: string | React.ReactNode;
  children: React.ReactNode; // Use children to accept description
}

const AccordionPrimary: React.FC<AccordionPrimaryProps> = ({
  title,
  children,
}) => {
  return (
    <Accordion type="single" className="" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-6 py-2 border-b-none hover:text-white hover:bg-gray-300 ">
          {title}
        </AccordionTrigger>
        <AccordionContent className="cursor-pointer ps-10 hover:text-white hover:bg-gray-300 ">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionPrimary;
