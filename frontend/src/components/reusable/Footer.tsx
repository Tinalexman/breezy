import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-theme-muted">
          <p className="text-sm font-[family-name:var(--font-epilogue)]">
            &copy; {new Date().getFullYear()} Breezy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
