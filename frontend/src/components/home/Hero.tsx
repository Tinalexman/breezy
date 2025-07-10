import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/Button";
import GridLines from "./GridLines";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleDeploy = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen w-full relative ">
      <div className="absolute w-full h-full">
        <GridLines />
      </div>
      <div className="z-50 text-center min-h-screen flex flex-col items-center justify-center absolute top-0 left-0 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl font-semibold mb-5 text-theme-foreground font-[family-name:var(--font-fraunces)]"
        >
          Build. Deploy. Share.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          className="text-lg text-theme-muted max-w-2xl mx-auto mb-10 font-[family-name:var(--font-epilogue)]"
        >
          Bridge the gap between mobile development and global web access. Let
          anyone run your Flutter app directly in their browser, like a native
          PWA.
        </motion.p>

        <Button variant="primary" size="lg" onClick={handleDeploy}>
          Deploy your first app
          <ArrowRightCircleIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
