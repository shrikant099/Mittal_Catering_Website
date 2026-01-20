import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | Mittal Catering Ajmer",
  description:
    "Learn how Mittal Catering Ajmer collects, uses, stores and protects your personal information under Indian laws.",
};

const page = () => {
  return (
    <>
    <AnnouncementBar/>
    <Navbar/>
    <section className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>

        {/* Content Wrapper */}
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            This Privacy Policy explains how Mittal Catering Ajmer (“we”, “our”,
            “us”) collects, uses, stores, shares, and protects your personal
            information when you access or use our website
            https://www.mittalcateringajmer.com/ (“Website” or “Platform”).
          </p>

          <p>
            Mittal Catering Ajmer operates from its registered address at House
            No. 1053A, Mittal Bhawan, Dhola Bhata Road, near All Saint School,
            Professors Colony, Dhola Bhata Colony, Ajmer, Rajasthan – 305007.
          </p>

          <p>
            By accessing, browsing, or using this Platform, including placing
            orders or submitting enquiries, you agree to the collection and use
            of your information in accordance with this Privacy Policy, our
            Terms & Conditions, and other applicable policies. If you do not
            agree with this Privacy Policy, please do not use the Platform.
          </p>

          <p>
            This Platform is intended for users located in India, and all
            personal data collected is stored and processed in accordance with
            Indian laws.
          </p>

          <h2 className="text-white font-semibold">
            1. Information We Collect
          </h2>

          <p>
            We may collect the following personal information when you interact
            with us:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Name</li>
            <li>Mobile number</li>
            <li>Email address</li>
            <li>Address and location details</li>
            <li>Event details or delivery details</li>
            <li>Order and service-related information</li>
            <li>
              Any other information voluntarily provided by you while contacting
              or engaging with us
            </li>
          </ul>

          <p>
            We do not intentionally collect sensitive personal data such as
            biometric information or facial recognition data.
          </p>

          <p>
            Payment-related information such as debit card, credit card, UPI, or
            net banking details is processed securely by third-party payment
            service providers. We do not store or have access to your financial
            information.
          </p>

          <h2 className="text-white font-semibold">
            2. Automatically Collected Information
          </h2>

          <p>
            When you visit our Website, certain non-personal information may be
            collected automatically, including:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>IP address</li>
            <li>Browser type and device information</li>
            <li>Pages visited and browsing behaviour</li>
            <li>Date and time of access</li>
          </ul>

          <p>
            This information is collected through cookies and similar
            technologies to enhance website performance, improve user
            experience, and maintain security. You may control or disable
            cookies through your browser settings.
          </p>

          <h2 className="text-white font-semibold">3. Use of Information</h2>

          <p>We use your personal information for the following purposes:</p>

          <ul className="list-disc list-inside space-y-1">
            <li>Processing orders, bookings, and enquiries</li>
            <li>Managing deliveries and catering services</li>
            <li>Customer support and communication</li>
            <li>Internal record-keeping and business operations</li>
            <li>Improving our services and website functionality</li>
            <li>Preventing fraud and misuse</li>
            <li>Complying with legal and regulatory obligations</li>
          </ul>

          <p>
            We do not sell, rent, or trade your personal information to any
            third party.
          </p>

          <h2 className="text-white font-semibold">
            4. Sharing of Information
          </h2>

          <p>
            We may share your personal information only with trusted third
            parties such as:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Delivery and logistics partners</li>
            <li>Payment gateway service providers</li>
            <li>Technical and IT service providers</li>
          </ul>

          <p>
            Such information is shared strictly on a need-to-know basis for
            service fulfillment. These third parties are required to maintain
            appropriate data security standards.
          </p>

          <p>
            We may also disclose your information if required to do so by law,
            court orders, government authorities, or law enforcement agencies.
          </p>

          <h2 className="text-white font-semibold">5. Data Security</h2>

          <p>
            We take reasonable technical and organisational measures to protect
            your personal information from unauthorised access, loss, misuse, or
            disclosure. While we strive to use commercially acceptable means to
            protect your data, no method of transmission over the internet is
            completely secure, and absolute security cannot be guaranteed.
          </p>

          <p>
            You are responsible for maintaining the confidentiality of any
            information you share with us and for ensuring the security of your
            communication with us.
          </p>

          <h2 className="text-white font-semibold">6. Data Retention</h2>

          <p>
            We retain personal information only for as long as necessary to
            fulfil the purposes outlined in this Privacy Policy or as required
            by applicable laws. Certain information may be retained for
            legitimate business purposes such as dispute resolution, fraud
            prevention, or compliance with legal obligations.
          </p>

          <h2 className="text-white font-semibold">7. Your Rights</h2>

          <p>You have the right to:</p>

          <ul className="list-disc list-inside space-y-1">
            <li>Request access to your personal information</li>
            <li>Request correction or update of inaccurate data</li>
            <li>
              Request deletion of your personal information, subject to legal
              requirements
            </li>
          </ul>

          <p>
            To exercise these rights, you may contact us using the details
            provided below.
          </p>

          <h2 className="text-white font-semibold">8. Withdrawal of Consent</h2>

          <p>
            You may withdraw your consent for the processing of your personal
            data by contacting us in writing. Please note that withdrawal of
            consent may limit or prevent your ability to access certain services
            offered through the Platform.
          </p>

          <h2 className="text-white font-semibold">
            9. Updates to This Privacy Policy
          </h2>

          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time without prior notice. Any changes will be effective immediately
            upon being published on the Website. Users are encouraged to review
            this page periodically to stay informed about how we protect their
            information.
          </p>

          <h2 className="text-white font-semibold">10. Contact Information</h2>

          <p>
            If you have any questions, concerns, or complaints regarding this
            Privacy Policy or the handling of your personal information. For
            questions related to privacy , please &nbsp; <Link className="underline text-accent" href="/contact-us">contact us.</Link>
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default page;
