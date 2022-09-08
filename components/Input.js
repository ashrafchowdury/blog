import React from "react";

export const Input = ({ name, input, value }) => {
  return (
    <>
      <input
        type={name}
        value={value}
        onChange={input}
        placeholder={name}
        name={name}
        className="w-full text-sm md:text-[16px] lg:text-lg my-2 md:my-3 py-3 px-4 rounded placeholder:capitalize dark:bg-[#253345] dark:text-white"
      />
    </>
  );
};
