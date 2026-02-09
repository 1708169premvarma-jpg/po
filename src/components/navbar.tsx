import React, { useState } from 'react';
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
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* Hamburger Menu for mobile view, right side */}
          <button
            className="block md:hidden text-white text-3xl focus:outline-none ml-4"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            &#9776; {/* Unicode for ☰ */}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-black/90 z-50 flex flex-col items-center py-6 animate-fade-in">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-xl py-2 w-full text-center hover:text-pink-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}