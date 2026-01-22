import Image from "next/image";

export default function ServiceBanner({ image,title }: any) {
  return (
    <section
      className="
        relative w-full
        aspect-[19/5]   
        sm:aspect-[21/6]
        md:h-[220px]
        lg:h-[380px]
        md:aspect-auto
        overflow-hidden
        bg-black
      "
    >
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 text-center px-4">
        <h1 className="text-base sm:text-xl md:text-3xl font-bold mb-3">
          {title}
        </h1>

        <div className="flex gap-2">
          <a
            href="tel:+919983748159"
            className="bg-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-semibold sm:text-sm md:px-6 md:py-3 md:text-base"
          >
            Call Us
          </a>

          <a
            href="https://wa.me/919983748159"
            className="border border-white px-3 py-1.5 rounded-full text-xs sm:text-sm md:px-6 md:py-3 md:text-base"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
