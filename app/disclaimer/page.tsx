import Link from "next/link";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Disclaimer | Mittal Catering Ajmer",
  description:
    "Read the official disclaimer of Mittal Catering Ajmer regarding website content, liability, external links, and usage terms.",
};

const page = () => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <section className="bg-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Disclaimer
          </h1>

          {/* Content */}
          <div className="space-y-6 text-sm leading-relaxed">
            <p>
              The words with initial capital letters used in this Disclaimer
              shall have the meanings defined below. These definitions shall
              apply regardless of whether the words appear in singular or plural
              form.
            </p>

            <p>
              For the purposes of this Disclaimer, “Company”, “We”, “Us”, or
              “Our” refers to Mittal Catering Ajmer, having its principal place
              of business at House No. 1053A, Mittal Bhawan, Dhola Bhata Road,
              near All Saint School, Professors Colony, Dhola Bhata Colony,
              Ajmer, Rajasthan – 305007.
            </p>

            <p>“Service” refers to the website operated by the Company.</p>

            <p>“Website” refers to https://www.mittalcateringajmer.com/.</p>

            <p>
              “You” refers to the individual accessing or using the Website, or
              the legal entity on whose behalf such individual is accessing or
              using the Website, as applicable.
            </p>

            <h2 className="text-white font-semibold">General Information</h2>

            <p>
              The information provided on the Website is for general
              informational and promotional purposes only. While we endeavour to
              keep the content accurate, complete, and up to date, Mittal
              Catering Ajmer makes no representations or warranties of any kind,
              express or implied, regarding the accuracy, reliability,
              suitability, or availability of the information, services, menus,
              images, or related content displayed on the Website.
            </p>

            <p>
              Any reliance you place on such information is strictly at your own
              risk.
            </p>

            <h2 className="text-white font-semibold">No Liability</h2>

            <p>
              The Company assumes no responsibility for errors, omissions, or
              inaccuracies in the content of the Website. In no event shall
              Mittal Catering Ajmer be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising
              out of or in connection with your access to, use of, or inability
              to use the Website or any content therein, whether based on
              contract, negligence, or any other legal theory.
            </p>

            <h2 className="text-white font-semibold">
              Website Availability & Changes
            </h2>

            <p>
              We reserve the right to add, modify, update, or remove any content
              on the Website at any time without prior notice. We do not warrant
              that the Website will always be available, uninterrupted,
              error-free, or free from viruses or other harmful components.
            </p>

            <h2 className="text-white font-semibold">
              External Links Disclaimer
            </h2>

            <p>
              The Website may contain links to third-party or external websites
              that are not owned, controlled, or maintained by the Company. Such
              links are provided for convenience only. Mittal Catering Ajmer
              does not endorse, guarantee, or assume responsibility for the
              accuracy, relevance, timeliness, or completeness of information
              available on such external websites, nor shall it be liable for
              any loss or damage arising from your use of them.
            </p>

            <h2 className="text-white font-semibold">
              Informational Purpose Only
            </h2>

            <p>
              The content available on the Website is intended solely for
              general guidance regarding our catering services and offerings. It
              should not be considered as professional advice of any kind,
              including but not limited to legal, financial, tax, health, or
              business advice. You are advised to consult appropriate
              professionals before making any decisions based on the information
              available on this Website.
            </p>

            <h2 className="text-white font-semibold">User-Generated Content</h2>

            <p>
              The Website may contain opinions, reviews, comments, or other
              user-generated content. Such content reflects the views of the
              respective users and does not necessarily represent the views or
              policies of Mittal Catering Ajmer. Users are solely responsible
              for the content they submit and any consequences arising from it.
              The Company reserves the right to remove or modify any content at
              its sole discretion.
            </p>

            <h2 className="text-white font-semibold">“As Is” Disclaimer</h2>

            <p>
              All information and services on the Website are provided on an “as
              is” and “as available” basis, without any warranties, express or
              implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement. The Company shall not be liable for any
              decisions made or actions taken based on the information provided
              on the Website.
            </p>

            <h2 className="text-white font-semibold">Contact Information</h2>

            <p>
              If you have any questions or concerns regarding this Disclaimer,
              you may &nbsp;{" "}
              <Link className="underline text-accent" href="/contact-us">
                contact us.
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
