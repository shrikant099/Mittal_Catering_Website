import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";
import ServiceBanner from "../components/ServiceBanner";
import Footer from "@/app/components/Footer";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Navbar from "@/app/components/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${baseUrl}${service.canonical}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-black text-white">
        <ServiceBanner image={service.bannerImage} />

        <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
          {/* Intro */}
          <p className="text-white/80 text-base leading-relaxed">
            {service.intro}
          </p>

          {/* Sections */}
          {service.sections.map((sec: any, i: number) => (
            <div key={i} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {sec.title}
              </h2>

              <p className="text-white/70 leading-relaxed">{sec.content}</p>

              {sec.list && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 list-disc text-white/70">
                  {sec.list.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
