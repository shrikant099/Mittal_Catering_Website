
import { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact Mittal Catering Ajmer | Guaranteed Train Food Delivery",
  description:
    "Contact Mittal Catering Ajmer for guaranteed train food delivery, bulk group orders, wedding & corporate catering. Call or send enquiry for fast response.",
  alternates: { canonical: "https://mittalcatering.in/contact-us" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Mittal Catering Ajmer",
    description:
      "Get in touch with Mittal Catering Ajmer for train food delivery and event catering.",
    url: "https://mittalcatering.in/contact-us",
    siteName: "Mittal Catering Ajmer",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground px-4 py-16">
        {/* HERO */}
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Contact Mittal Catering Ajmer
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Need train food delivery at Ajmer Junction or planning a bulk group
            order, wedding or corporate event? Our team is ready to help you
            24/7 with guaranteed delivery & premium vegetarian catering
            services.
          </p>
        </section>

        {/* GRID */}
        <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="bg-[#121212] rounded-3xl p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>
            <p className="text-white/70">
              Mittal Catering Ajmer has been serving passengers and families
              since 1983 with pure Shudh Vegetarian food, authentic taste and
              guaranteed delivery at Ajmer Railway Station.
            </p>

            <div className="space-y-4 text-white/80">
              <div>
                <p className="font-bold text-white">Address</p>
                <p>
                  Mittal Bhawan, Near All Saints School, Dhola Bhata Road, Ajmer
                  (Raj.) 305001
                </p>
              </div>
              <div>
                <p className="font-bold text-white">Phone</p>
                <p>+91 95877 48159</p>
                <p>+91 99999 74815</p>
              </div>
              <div>
                <p className="font-bold text-white">Email</p>
                <p>mittalcatering.ajmer@gmail.com</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/group-order-inquiry"
                className="inline-block bg-primary text-black px-6 py-3 rounded-xl font-bold"
              >
                Bulk / Group Order Enquiry →
              </Link>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-[#121212] rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Send Us an Enquiry
            </h2>
            <form className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Your Name"
                className="bg-black border border-white/10 p-3 rounded-xl"
              />
              <input
                placeholder="Mobile Number"
                className="bg-black border border-white/10 p-3 rounded-xl"
              />
              <textarea
                placeholder="Your Message / Requirement"
                className="bg-black border border-white/10 p-3 rounded-xl sm:col-span-2 h-32"
              />
              <button className="sm:col-span-2 bg-primary text-black py-4 rounded-xl font-bold hover:opacity-90">
                Submit Enquiry
              </button>
            </form>
          </div>
        </section>

        {/* MAP */}
        <section className="max-w-6xl mx-auto mt-16">
          <iframe
            className="w-full h-80 rounded-3xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Mittal%20Catering%20Ajmer&output=embed"
          />
        </section>

        {/* FOOTER CTA */}
        <section className="max-w-6xl mx-auto text-center mt-20">
          <h3 className="text-3xl font-bold text-primary mb-3">
            Trusted Train Food Partner at Ajmer Junction
          </h3>
          <p className="text-white/70 max-w-3xl mx-auto">
            Whether it is a single meal or a bulk group order, Mittal Catering
            Ajmer ensures hygienic preparation, authentic taste and guaranteed
            on-seat delivery for every passenger.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
