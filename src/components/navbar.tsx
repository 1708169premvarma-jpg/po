import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Styling', href: '#styling' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <span className="text-2xl font-bold">DESIGN x STYLE</span>
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:flex gap-2 ml-auto justify-end">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-pink-400 transition-colors px-3 navbar-link-mobile-hide"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = link.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    const offset = 80; // Account for fixed navbar height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* Hamburger Menu for mobile view, right side */}
          <button
            className="block md:hidden text-white text-3xl focus:outline-none ml-4 transition-transform"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {open && (
        <div ref={menuRef} className="md:hidden fixed top-16 left-0 w-full bg-black/95 backdrop-blur-md z-50 flex flex-col items-center py-6 border-b border-white/10">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-xl py-4 w-full text-center hover:text-pink-400 transition-colors border-b border-white/5 last:border-b-0"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                const targetId = link.href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  const offset = 80; // Account for fixed navbar height
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}