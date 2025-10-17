import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        // scrolling down → fade out
        controls.start({ opacity: 0, y: -40, transition: { duration: 0.2, ease: "easeOut" } });
      } else {
        // scrolling up → fade in
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } });
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  const btnHover = { scale: 1.05 };
  const btnTap = { scale: 0.95 };

  return (
    <motion.nav
      animate={controls}
      initial={{ opacity: 1 }}
      className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src="/images/logo.png" alt="Seamark" className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold tracking-tight">Seamark</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "What We Do", "Why Sea Air", "Sustainability", "Contact Us"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 rounded"
                whileHover={btnHover}
                whileTap={btnTap}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="grid gap-2">
            {["Home", "What We Do", "Why Sea Air", "Sustainability", "Contact Us"].map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
