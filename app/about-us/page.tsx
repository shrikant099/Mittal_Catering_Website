import Image from "next/image";
import AnnouncementBar from "../components/AnnouncementBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WhyChooseMittalCatering from "../components/WhyChooseMittalCatering";

export const metadata = {
  title: "About Us | Mittal Catering Ajmer Since 1983",
  description:
    "Learn about Mittal Catering Ajmer, serving since 1983 with trusted vegetarian catering services for events, weddings and rail passengers.",
};

const page = () => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <section className="bg-black text-gray-300">
        {/* Banner */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black">
          <img
            src="https://res.cloudinary.com/dhxo0zx5u/image/upload/v1769174006/about_us_kw00dz.png"
            alt="Mittal Catering Ajmer Banner"
            className="
     w-full h-full
    object-contain
    md:object-cover
    md:object-left
    "
          />

          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center hidden  px-4 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Mittal Catering – Since 1983
              </h1>
              <p className="text-primary mt-2 text-sm sm:text-base">
                Trusted Catering Services in Ajmer
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4  sm:py-12 space-y-6 text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            About Us
          </h2>
          <p className="text-gray-300">
            Mittal Catering Ajmer is a respected and trusted name in the
            catering industry, proudly serving Ajmer and surrounding areas since
            1983. With over four decades of experience, we have built a strong
            reputation for delivering best-in-class catering services marked by
            quality, consistency, and heartfelt hospitality.
          </p>

          <p>
            From the past 10 year we are serving passengers halt at ajmer
            railway station. Our main purpose is to serve the authentic taste of
            restaurant food in trains which halts at Ajmer Junction.
          </p>

          <p>
            We are Known for our guaranteed delivery, we ensure that each
            passenger who orders get his food at his seat comfort. Whether it is
            single order or group order we care for each and everything.
          </p>

          <p>
            From wedding celebrations and birthday parties to corporate events
            and social gatherings, we specialise in managing events of all sizes
            with elegance, precision, and an unwavering commitment to
            excellence. Every occasion we cater is treated as special, ensuring
            personalised service, timely execution, and memorable culinary
            experiences.
          </p>

          <p>
            We are popular known for our pure “Shudh Vegetarian” cuisine,
            prepared using authentic ingredients and pure desi ghee, maintaining
            traditional taste while adhering to the highest standards of hygiene
            and food safety. Our focus on quality ingredients and authentic
            flavours has earned us the trust of generations of families and
            organisations.
          </p>

          <p>
            As market leaders in outdoor catering, Mittal Catering Ajmer offers
            a wide range of customised catering solutions designed to suit
            diverse events, themes, and budgets. Our experienced team,
            professional approach, and attention to detail ensure that every
            event is executed flawlessly from menu planning to final service.
          </p>

          <p>
            At Mittal Catering Ajmer, food is not just a service it is a
            tradition, a responsibility, and a celebration of taste, trust, and
            togetherness.
          </p>
        </div>
      </section>
      <WhyChooseMittalCatering/>
      <Footer />
    </>
  );
};

export default page;
