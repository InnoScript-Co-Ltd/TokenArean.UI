import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

const Loader = () => {
  return (
    <div className=" w-ful h-screen max:h-[80%] flex justify-center items-center">
      <Trefoil
        size="40"
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.4"
        color="black"
      />
    </div>
  );
};

export default Loader;
