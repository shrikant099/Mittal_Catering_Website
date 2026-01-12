import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Mittal Catering
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Mittal Catering is a trusted catering service delivering hygienic
              and delicious vegetarian food for weddings, corporate events,
              government contracts and bulk food orders across Rajasthan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/menu" className="hover:text-primary">Menu</a></li>
              <li><a href="/about-us" className="hover:text-primary">About Us</a></li>
              <li><a href="/services" className="hover:text-primary">Services</a></li>
              <li><a href="/contact-us" className="hover:text-primary">Contact Us</a></li>
            </ul>
          </div>

          {/* Important */}
          <div>
            <h4 className="text-white font-semibold mb-4">Important</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="hover:text-primary">Terms & Conditions</a></li>
              <li><a href="/refund-policy" className="hover:text-primary">Refund Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-primary">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>

            <p className="text-sm text-gray-400 mb-2">
              Mittal Bhawan, Near All Saints School,<br />
              Dholabhata Road, Ajmer (Rajasthan)
            </p>

            <p className="text-sm mb-1">
              📞{" "}
              <a
                href="tel:+919983748159"
                className="hover:text-primary"
              >
                +91 99837 48159
              </a>
            </p>

            <p className="text-sm mb-4">
              ✉️{" "}
              <a
                href="mailto:mittalcatering.ajmer@gmail.com"
                className="hover:text-primary"
              >
                mittalcatering.ajmer@gmail.com
              </a>
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="border border-primary p-2 rounded hover:bg-primary hover:text-black transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="border border-primary p-2 rounded hover:bg-primary hover:text-black transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="border border-primary p-2 rounded hover:bg-primary hover:text-black transition"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-medium">
            Mittal Catering
          </span>
          . All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
