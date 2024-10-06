import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Home() {

  return (
    <div className="w-full h-[100vh]">
      <Header />
      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="text-[60px] font-extrabold bg-gradient-to-r from-[#144EE3] to-[#EB568E] text-transparent bg-clip-text famil">
          Shorten Your Loooong Links :)
        </h1>
        <p className="text-[#C9CED6] text-[16px] p-3 ">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
        <InputField />

        
      </div>
    </div>
  );
}
