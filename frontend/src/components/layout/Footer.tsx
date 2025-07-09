import React from "react";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "/pricing" },
      { name: "Documentation", href: "#" },
      { name: "API", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
    Social: [
      { name: "GitHub", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Discord", href: "#" },
    ],
  };

  return (
    <footer className="bg-dark-surface border-t border-dark-surface-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent-teal rounded-lg flex items-center justify-center">
                <span className="text-dark-primary font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-text-light">Breezy</span>
            </div>
            <p className="text-text-muted mb-6 max-w-md">
              Transform your Flutter mobile applications into interactive web
              experiences. Share your apps instantly with the world.
            </p>
            <div className="flex space-x-4">
              {footerLinks.Social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-muted hover:text-accent-teal transition-colors duration-200"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-text-light font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-text-muted hover:text-accent-teal transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-surface-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-dim text-sm">
            © {new Date().getFullYear()} Breezy. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-text-dim text-sm">
              Made with ❤️ for Flutter developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
