import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="flex w-full h-full text-center mt-20 my-auto bg-slate-500 mx-auto">
      <ClipLoader size={50} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
