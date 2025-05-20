
import Image from "next/image";
import url from "../../src/assets/img/loading/out.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Image
        src={url}
        height={60}
        width={60}
        alt={`A cute animal!`}
        unoptimized={true}
      />
    </div>
  );
};

export default Loader;
