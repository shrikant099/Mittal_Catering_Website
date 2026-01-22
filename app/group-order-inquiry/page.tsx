// app/group-order-enquiry/page.tsx
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Group Order Enquiry for Train Food in Ajmer | Mittal Catering Ajmer",
  description:
    "Place bulk & group food orders for trains at Ajmer Junction with Mittal Catering Ajmer. Shudh Vegetarian, hygienic meals, guaranteed seat delivery. Submit your enquiry now.",
  openGraph: {
    title:
      "Group Order Enquiry for Train Food in Ajmer | Mittal Catering Ajmer",
    description:
      "Bulk & group train food orders in Ajmer. Shudh Vegetarian meals, hygienic kitchen, guaranteed seat delivery. Contact Mittal Catering Ajmer for events & group travel.",
    siteName: "Mittal Catering Ajmer",
  },
};

export default function GroupOrderEnquiryPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pt-24 pb-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-600/20 via-black to-black" />
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block rounded-full border border-orange-500/40 px-4 py-1 text-xs text-orange-400 mb-4">
              Bulk & Group Train Food Orders
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Group Order Enquiry for Train Food in{" "}
              <span className="text-orange-500">Ajmer</span>
            </h1>
            <p className="mt-4 text-white/70 max-w-3xl mx-auto">
              Looking to place a bulk or group food order for trains at Ajmer
              Junction? Mittal Catering Ajmer delivers hygienic, Shudh
              Vegetarian meals directly to your seat with guaranteed on-time
              service for group travel, events and tours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#enquiry"
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-4 rounded-xl"
              >
                Submit Enquiry
              </a>
              <a
                href="/menu"
                className="border border-orange-500 text-orange-400 hover:bg-orange-500/10 font-bold px-8 py-4 rounded-xl"
              >
                View Menu
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="px-4 py-14">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Mittal Catering Ajmer for Group Orders?
              </h2>
              <ul className="space-y-3 text-white/80">
                <li>✓ Bulk & group train food orders at Ajmer Junction</li>
                <li>✓ Pure “Shudh Vegetarian” & Jain meal options</li>
                <li>✓ Guaranteed seat delivery & on-time service</li>
                <li>✓ Hygienic kitchen, authentic taste, pure desi ghee</li>
                <li>✓ Ideal for tours, corporate travel, weddings & events</li>
              </ul>
              <p className="mt-6 text-white/70">
                Serving Ajmer since 1983, we specialise in authentic vegetarian
                cuisine with uncompromising hygiene standards and personalised
                service for every group.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">
                Bulk Train Food Delivery at Ajmer
              </h2>
              <p className="text-white/80">
                From tour operators to family groups, our team ensures smooth
                coordination and timely delivery at Ajmer Junction. Whether it’s
                a single coach or a full train, we manage everything from menu
                planning to final service.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-orange-500/40 text-orange-400">
                  Bulk Orders for Trains
                </span>
                <span className="px-4 py-2 rounded-full border border-orange-500/40 text-orange-400">
                  Jain & Vegetarian Meals
                </span>
                <span className="px-4 py-2 rounded-full border border-orange-500/40 text-orange-400">
                  Guaranteed Delivery
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section
          id="enquiry"
          className="px-4 py-16 bg-gradient-to-b from-black to-orange-500/10"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-2">Bulk Order Enquiry</h2>
              <p className="text-white/70 mb-6">
                Fill the form and our team will contact you shortly.
              </p>
              <form className="space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 focus:border-orange-500 outline-none"
                />
                <input
                  name="phone"
                  required
                  placeholder="Mobile Number"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 focus:border-orange-500 outline-none"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your group order requirement…"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 focus:border-orange-500 outline-none"
                />
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl">
                  Submit Enquiry
                </button>
              </form>
            </div>
            <div className="text-white/80">
              <h2 className="text-2xl font-bold mb-4">
                About Mittal Catering Ajmer
              </h2>
              <p className="mb-3">
                Mittal Catering Ajmer is a trusted name since 1983, delivering
                best-in-class catering services with quality, consistency and
                heartfelt hospitality.
              </p>
              <p className="mb-3">
                For over 10 years, we have been serving passengers at Ajmer
                Junction, bringing authentic restaurant taste to trains with
                guaranteed seat delivery.
              </p>
              <p className="mb-3">
                From weddings and birthdays to corporate events and social
                gatherings, we manage events of all sizes with precision and
                excellence.
              </p>
              <p>
                Our Shudh Vegetarian cuisine is prepared using authentic
                ingredients and pure desi ghee, maintaining traditional taste
                with the highest hygiene standards.
              </p>
            </div>
          </div>
        </section>
        {/* Footer CTA */}
        <section className="px-4 py-12 text-center border-t border-white/10">
          <p className="text-white/70">Call for Bulk Orders:</p>
          <a href="tel:+919999748159">
            <p className="text-xl font-bold text-orange-500">+919999748159</p>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
