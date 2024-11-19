import React, { useState } from "react";

function Tailwind() {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <div>
      {/* Navbar  */}

      <nav className="p-5 shadow-md flex justify-between items-center">
        <a
          href=""
          className="flex gap-3 items-center font-display font-semibold text-lg "
        >
          <img
            className={`max-w-12 rounded-lg ${!show && "hidden"}`}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
            alt=""
          />
          <span className="xs:hidden">Brand Logo</span>
        </a>

        <button
          onClick={handleToggle}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-stone-800 border-red-500 hover:border-2 transition-all"
        >
          {show ? "Hide" : "Show"}
        </button>
      </nav>
    </div>
  );
}

export default Tailwind;
