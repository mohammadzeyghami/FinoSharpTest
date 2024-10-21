import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <p className="text-xl font-bold text-center">Select Your Language </p>

      <div className="flex gap-4">
        <Link to={"/en/home"}>
          <Button size={"lg"}>EN</Button>
        </Link>
        <Link to={"/fa/home"}>
          <Button size={"lg"}>Fa</Button>
        </Link>
      </div>
      <p className="mt-10 text-center">Created By Mohammad Zeyghami</p>
    </div>
  );
};

export default WelcomePage;
