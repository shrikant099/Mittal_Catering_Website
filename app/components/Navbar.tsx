"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const count = useSelector((s: any) =>
    s.cart.items.reduce((a: any, b: { qty: any }) => a + b.qty, 0)
  );

  return (
    <header className="bg-[#0B0B0B] text-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-lg text-white lg:text-xl font-bold text-primary"
        >
          Mittal Catering
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center text-white gap-8 text-lg font-medium">
          <NavLink href="/menu">Menu</NavLink>
          <NavLink href="/about-us">About Us</NavLink>

          {/* SERVICES */}
          <li className="relative group text-bold">
            <span className="cursor-pointer hover:text-primary transition">
              Services
            </span>

            <Dropdown>
              <DropdownLink href="/services/mittal-catering">
                Mittal Catering Services
              </DropdownLink>
              <DropdownLink href="/services/surbhi-sweets">
                Surbhi Sweets
              </DropdownLink>
              <DropdownLink href="/services/government-food-contract">
                Government Food Contract
              </DropdownLink>
              <DropdownLink href="/services/food-on-call">
                Food on Call / Home Delivery
              </DropdownLink>
              <DropdownLink href="/services/food-delivery-trains">
                Food Delivery in Trains
              </DropdownLink>
              <DropdownLink href="/services/food-delivery-buses">
                Food Delivery in Buses
              </DropdownLink>
            </Dropdown>
          </li>

          <NavLink href="/blog">Blogs</NavLink>
          <NavLink href="/group-order-inquiry">Group Order Inquiry</NavLink>
          <NavLink href="/contact-us">Contact Us</NavLink>
        </ul>

        <div className="relative">
          <ShoppingCart size={26} />

          <Link href="/checkout" className="absolute inset-0" aria-label="Cart">
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-muted px-6 py-5 text-sm space-y-4">
          {/* BASIC LINKS */}
          <MobileLink href="/" close={() => setMobileOpen(false)}>
            Home
          </MobileLink>
          <MobileLink href="/menu" close={() => setMobileOpen(false)}>
            Menu
          </MobileLink>
          <MobileLink href="/about-us" close={() => setMobileOpen(false)}>
            About Us
          </MobileLink>
          <MobileLink href="/contact-us" close={() => setMobileOpen(false)}>
            Contact
          </MobileLink>

          {/* SERVICES ACCORDION */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between font-medium"
            >
              <span>Services</span>
              {servicesOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {servicesOpen && (
              <div className="mt-3 ml-4 space-y-3 border-l border-muted pl-4 text-muted">
                <MobileLink
                  href="/services/mittal-catering"
                  close={() => setMobileOpen(false)}
                >
                  Mittal Catering Services
                </MobileLink>
                <MobileLink
                  href="/services/surbhi-sweets"
                  close={() => setMobileOpen(false)}
                >
                  Surbhi Sweets
                </MobileLink>
                <MobileLink
                  href="/services/government-food-contract"
                  close={() => setMobileOpen(false)}
                >
                  Government Food Contract
                </MobileLink>
                <MobileLink
                  href="/services/food-on-call"
                  close={() => setMobileOpen(false)}
                >
                  Food on Call / Home Delivery
                </MobileLink>
                <MobileLink
                  href="/services/food-delivery-trains"
                  close={() => setMobileOpen(false)}
                >
                  Food Delivery in Trains
                </MobileLink>
                <MobileLink
                  href="/services/food-delivery-buses"
                  close={() => setMobileOpen(false)}
                >
                  Food Delivery in Buses
                </MobileLink>
              </div>
            )}
          </div>

          <MobileLink href="/blogs" close={() => setMobileOpen(false)}>
            Blogs
          </MobileLink>

          {/* POLICIES ACCORDION (OPTIONAL BUT RECOMMENDED) */}
          <div>
            <button
              onClick={() => setPolicyOpen(!policyOpen)}
              className="w-full flex items-center justify-between font-medium"
            >
              <span>Policies</span>
              {policyOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {policyOpen && (
              <div className="mt-3 ml-4 space-y-3 border-l border-muted pl-4 text-muted">
                <MobileLink
                  href="/privacy-policy"
                  close={() => setMobileOpen(false)}
                >
                  Privacy Policy
                </MobileLink>
                <MobileLink
                  href="/terms-conditions"
                  close={() => setMobileOpen(false)}
                >
                  Terms & Conditions
                </MobileLink>
                <MobileLink
                  href="/refund-policy"
                  close={() => setMobileOpen(false)}
                >
                  Refund Policy
                </MobileLink>
                <MobileLink
                  href="/disclaimer"
                  close={() => setMobileOpen(false)}
                >
                  Disclaimer
                </MobileLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= COMPONENTS ================= */

function NavLink({ href, children }: any) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-primary transition text-extrabold"
      >
        {children}
      </Link>
    </li>
  );
}

function Dropdown({ children }: any) {
  return (
    <ul
      className="
      absolute left-0 top-full mt-3
      min-w-[260px]
      bg-white text-secondary
      rounded-lg shadow-xl
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
    "
    >
      {children}
    </ul>
  );
}

function DropdownLink({ href, children }: any) {
  return (
    <li>
      <Link
        href={href}
        className="block px-5 py-3 text-sm hover:bg-muted hover:text-primary transition"
      >
        {children}
      </Link>
    </li>
  );
}
function MobileLink({ href, close, children }: any) {
  return (
    <Link
      href={href}
      onClick={close}
      className="block text-white hover:text-primary transition"
    >
      {children}
    </Link>
  );
}
