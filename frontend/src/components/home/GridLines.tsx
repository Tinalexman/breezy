"use client";
import React from "react";
import { motion } from "framer-motion";

const GridLines = () => {
  const COUNT = 20;
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col justify-between w-full h-full absolute top-0 left-0">
        {Array.from({ length: COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-[1px] bg-theme-border"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 5,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between w-full h-full absolute top-0 left-0">
        {Array.from({ length: COUNT }).map((_, index) => (
          <motion.div
            key={index}
            className="w-[1px] h-full bg-theme-border"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 2.5,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GridLines;
