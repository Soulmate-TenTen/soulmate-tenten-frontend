import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingImg from "@/assets/images/character-save-loading.svg";
import CompleteImg from "@/assets/images/character-save-complete.svg";
import { LongButton } from "@/components/buttons";

export default function DiarySave() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
        {loading ? (
            <Image src={LoadingImg} alt="loading" className="absolute bottom-[200px]"/>
        ) : (
            <div className="flex flex-col justify-center items-center h-screen relative">
                <Image src={CompleteImg} alt="complete"/>
                <LongButton 
                    className="absolute bottom-[50px]" 
                    onClick={() => router.push("/diary")}
                >
                    확인
                </LongButton>
            </div>
        )}
    </div>
  );
}