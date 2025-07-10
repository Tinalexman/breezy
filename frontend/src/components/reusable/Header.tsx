import { motion } from "framer-motion";
import React from "react";
import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-theme-primary font-[family-name:var(--font-fraunces)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Breezy
        </motion.h1>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
