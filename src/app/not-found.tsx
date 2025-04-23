"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import error from "../../public/error.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <Lottie 
          animationData={error} 
          loop={true} 
          style={{ width: 300, height: 300 }}
        />
      </div>
      <h2 className="text-4xl font-semibold mt-4">Not Found</h2>
      <p className="text-lg text-center my-2">
        Could not find the requested resource.
      </p>
      <button className="px-6 py-3 bg-gray-300 rounded-md my-4 hover:bg-gray-400 transition-colors">
        <Link href="/" className="text-xl font-medium text-black hover:text-white">
          Return Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound; 
