import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
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
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-[200px]"
          >
            <Image src={LoadingImg} alt="loading" />
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center items-center h-screen relative"
          >
            <Image src={CompleteImg} alt="complete" />
            <LongButton 
              className="absolute bottom-[50px]" 
              onClick={() => router.push("/diary")}
            >
              확인
            </LongButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}