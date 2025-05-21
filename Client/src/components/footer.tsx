import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}
const Footer = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://media.licdn.com/dms/image/v2/C4D0BAQFtFSZK2Zb4PQ/company-logo_100_100/company-logo_100_100/0/1631342195857?e=1752710400&v=beta&t=anbQHzCiB8dnTTKxIZ0vJtgbwzi4RPadtK821Qj0dOU", // Updated path to assets folder
    alt: "Fusionmarket logo",
    title: "Fusionmarket.com",
  },
}: FooterProps) => {
  return (
    <section className="w-screen h-auto pb-5 sm:pb-10 overflow-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8 border-2 border-pri rounded-2xl"
                />
              </a>
              <h2 className="text-xl text-txt font-semibold montserrat">{logo.title}</h2>
            </div>
            <p className="text-md text-gray-400 crimson-pro">
              The best place to buy and sell products online. Discover exclusive deals and grow your business with our ecommerce platform.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaInstagram className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaFacebook className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaTwitter className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaLinkedin className="size-6" />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold montserrat">{section.title}</h3>
                <ul className="space-y-4 text-md text-gray-400 crimson-pro">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left montserrat">
          <p>© 2025 Fusionmarket.com. All rights reserved.</p>
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-primary">
              <a href="#"> Terms and Conditions</a>
            </li>
            <li className="hover:text-primary">
              <a href="#"> Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer };