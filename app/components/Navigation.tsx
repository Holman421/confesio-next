import React from "react";
import NavButton from "./NavButton";
import Image from "next/image";
import QuestionmarkIcon from "./icons/QuestionmarkIcon";

const Navigation = () => {
  return (
    <div className="h-full shrink-0 w-264 p-16 rounded-2xl items-center bg-panelBackground flex flex-col justify-between border border-borderBlue">
      <div className="flex flex-col w-full">
        <h1 className="font-medium text-4xl mt-16 mb-8 text-center">Confesio</h1>
        <div className="w-full h-1 bg-gradient-to-l my-20 from-transparent via-white to-transparent" />
        <div className="flex w-full flex-col gap-8 px-8">
          <NavButton label="Dashboard" iconType="dashboard" isActive />
          <NavButton label="Files" iconType="files" />
          <NavButton label="Profile" iconType="profile" />
          <NavButton label="Settings" iconType="settings" />
        </div>
        <h3 className="uppercase text-[14px] py-16 w-full text-left pl-8 font-bold">
          Account pages
        </h3>
        <div className="flex w-full flex-col gap-8 px-8">
          <NavButton label="Sign In" iconType="sign-in" variant="secondary" />
          <NavButton label="Sign Up" iconType="sign-up" variant="secondary" />
          <NavButton label="Tables" iconType="tables" variant="secondary" />
        </div>
      </div>
      <div className="w-full h-170 relative">
        <Image
          src="/images/docs-bg.jpg"
          alt="Documentation Background"
          className="absolute z-[1] w-full h-full object-cover rounded-2xl"
          width={264}
          height={170}
        />
        <div className="relative z-[2] justify-between h-full flex flex-col p-16 bg-black/40">
          <div className="size-35 bg-white rounded-xl flex items-center justify-center p-1">
              <QuestionmarkIcon className="size-full text-[#582CFF]" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold">Need help?</h4>
            <p className="text-[12px]">Please check our docs</p>
            <button className="cursor-pointer w-full flex justify-center items-center py-12 bg-[#060B28BD] mt-8">Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
