import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Admissions", href: "#admissions" },
    { name: "Campus Life", href: "#campus-life" },
    { name: "Research", href: "#" },
    { name: "Faculty", href: "#" },
    { name: "Career", href: "#" },
  ];

  const resources = [
    { name: "Academic Calendar", href: "#" },
    { name: "Library", href: "#" },
    { name: "Student Portal", href: "#" },
    { name: "Faculty Portal", href: "#" },
    { name: "Alumni Network", href: "#" },
    { name: "Publications", href: "#" },
  ];

  const policies = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Code of Conduct", href: "#" },
    { name: "Anti-Harassment Policy", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      href: "https://youtube.com",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 rounded-lg bg-numl-500 flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="text-white font-bold text-2xl">NUML</span>
            </div>

            <p className="mt-4 text-gray-400 max-w-md">
              National University of Modern Languages is dedicated to excellence
              in education, research, and cultural understanding through
              language learning and global engagement.
            </p>

            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} National University of Modern Languages. All
              rights reserved.
            </p>

            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">
                Designed with excellence in mind
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
