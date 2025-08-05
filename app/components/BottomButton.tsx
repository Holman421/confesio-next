import React from "react";

type BottomButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
};

const BottomButton = ({ children, variant }: BottomButtonProps) => {
  const isPrimary = variant === "primary";
  const bgColor = isPrimary
    ? "bg-gradient-to-r from-[#582CFF] to-[#351A99]"
    : "bg-transparent hover:bg-white/10 transition-colors duration-300";
  return (
    <button
      className={`${bgColor} py-10 px-30 rounded-xl border border-borderBlue`}
    >
      {children}
    </button>
  );
};

export default BottomButton;
