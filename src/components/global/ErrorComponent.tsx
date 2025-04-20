import { IoReloadOutline } from "react-icons/io5";

const ErrorComponent = ({ error }: { error: string | null }) => {
  console.log(error);

  return (
    <div className=" w-full h-screen max-h-[80%] flex justify-center items-center">
      <div className=" flex justify-center items-center flex-col gap-5 ">
        <p> Something Went Wrong !!!"</p>
        {/* <p> {error ? error : "Something Went Wrong !!!"} </p> */}
        <div
          className=" p-4 border border-black rounded-lg cursor-pointer group/reload"
          onClick={() => window.location.reload()}
        >
          <IoReloadOutline className=" text-xl text-black group-hover/reload:rotate-[360deg] transition-all duration-1000 " />
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
