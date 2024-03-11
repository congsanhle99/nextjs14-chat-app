import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-200 w-full px-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-primary uppercase">Quick Chat</h1>
      </div>
      <div className="">current user</div>
    </div>
  );
};

export default Header;
