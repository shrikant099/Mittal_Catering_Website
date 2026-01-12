export const metadata = {
  title: "About Us | Mittal Catering Ajmer Since 1983",
  description:
    "Learn about Mittal Catering Ajmer, serving since 1983 with trusted vegetarian catering services for events, weddings and rail passengers.",
};

const page = () => {
  return (
    <section className="bg-black text-gray-300">
      {/* Banner */}
      <div className="relative w-full h-[220px] md:h-[320px] lg:h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop"
          alt="Mittal Catering Ajmer Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Mittal Catering – Since 1983
            </h1>
            <p className="text-primary mt-2 text-sm md:text-base">
              Trusted Catering Services in Ajmer
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-6 text-sm leading-relaxed">
        <h2 className="text-2xl font-semibold text-white">About Us</h2>

        <p>
          Mittal Catering Ajmer is a respected and trusted name in the catering
          industry, proudly serving Ajmer and surrounding areas since 1983. With
          over four decades of experience, we have built a strong reputation for
          delivering best-in-class catering services marked by quality,
          consistency, and heartfelt hospitality.
        </p>

        <p>
          From the past 10 year we are serving passengers halt at ajmer railway
          station. Our main purpose is to serve the authentic taste of
          restaurant food in trains which halts at Ajmer Junction.
        </p>

        <p>
          We are Known for our guaranteed delivery, we ensure that each
          passenger who orders get his food at his seat comfort. Whether it is
          single order or group order we care for each and everything.
        </p>

        <p>
          From wedding celebrations and birthday parties to corporate events and
          social gatherings, we specialise in managing events of all sizes with
          elegance, precision, and an unwavering commitment to excellence. Every
          occasion we cater is treated as special, ensuring personalised
          service, timely execution, and memorable culinary experiences.
        </p>

        <p>
          We are popular known for our pure “Shudh Vegetarian” cuisine, prepared
          using authentic ingredients and pure desi ghee, maintaining
          traditional taste while adhering to the highest standards of hygiene
          and food safety. Our focus on quality ingredients and authentic
          flavours has earned us the trust of generations of families and
          organisations.
        </p>

        <p>
          As market leaders in outdoor catering, Mittal Catering Ajmer offers a
          wide range of customised catering solutions designed to suit diverse
          events, themes, and budgets. Our experienced team, professional
          approach, and attention to detail ensure that every event is executed
          flawlessly from menu planning to final service.
        </p>

        <p>
          At Mittal Catering Ajmer, food is not just a service it is a
          tradition, a responsibility, and a celebration of taste, trust, and
          togetherness.
        </p>

        {/* Contact Info */}
        <div className="pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact Information
          </h3>

          <p>
            Website:{" "}
            <a
              href="https://www.mittalcateringajmer.com/"
              className="text-primary underline"
            >
              https://www.mittalcateringajmer.com/
            </a>
          </p>

          <p>
            Email:{" "}
            <a
              href="mailto:info@mittalcateringajmer.com"
              className="text-primary underline"
            >
              info@mittalcateringajmer.com
            </a>
          </p>

          <p>
            Address: House No. 1053A, Mittal Bhawan, Dhola Bhata Road, near All
            Saint School, Professors Colony, Dhola Bhata Colony, Ajmer,
            Rajasthan – 305007
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
