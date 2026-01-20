import Link from "next/link";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Return & Refund Policy | Mittal Catering Ajmer",
  description:
    "Read Mittal Catering Ajmer return and refund policy for orders, cancellations, payments, and catering service terms.",

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
          Return & Refund Policy
        </h1>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            This Return & Refund Policy (“Policy”) applies to all orders,
            bookings, and purchases made through the website
            https://www.mittalcateringajmer.com/ (“Website” or “Platform”),
            operated by Mittal Catering Ajmer (“we”, “our”, “us”).
          </p>

          <p>
            By placing an order or booking our services, you agree to be bound
            by this Policy along with our Terms & Conditions and Privacy Policy.
          </p>

          <h2 className="text-white font-semibold">
            1. Nature of Products & Services
          </h2>

          <p>
            Mittal Catering Ajmer primarily deals in freshly prepared food
            items, catering services, bulk orders, and event-based food
            services. Due to the perishable and customised nature of food and
            catering services, returns are not accepted once the food is
            prepared, delivered, or the service has been executed.
          </p>

          <h2 className="text-white font-semibold">2. Cancellation Policy</h2>

          <p className="font-medium text-white">A. Cancellation by Customer</p>

          <p>
            Orders or bookings may be cancelled only before food preparation or
            service arrangements have commenced.
          </p>

          <p>
            Once food preparation has started, raw materials have been procured,
            or service execution is underway, cancellation requests shall not be
            accepted.
          </p>

          <p>
            Any eligible refund for approved cancellations shall be processed as
            per the terms mentioned in this Policy.
          </p>

          <p className="font-medium text-white">
            B. Cancellation by Mittal Catering Ajmer
          </p>

          <p>
            We reserve the right to cancel an order or booking under the
            following circumstances:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Non-availability of ingredients or menu items</li>
            <li>Operational or logistical constraints</li>
            <li>Payment failures or technical issues</li>
            <li>Unforeseen events, including force majeure situations</li>
          </ul>

          <p>
            In such cases, any advance payment or amount received shall be
            refunded in full.
          </p>

          <h2 className="text-white font-semibold">3. Return Policy</h2>

          <p>
            Since we provide consumable and perishable food products, returns
            are not applicable after successful delivery or completion of
            service.
          </p>

          <p>
            However, refund or replacement may be considered at our sole
            discretion in the following exceptional cases:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Wrong item delivered</li>
            <li>Missing items in the order</li>
            <li>Serious food quality issues</li>
            <li>Spillage or damage during transit</li>
            <li>Packaging damage rendering the food unfit for consumption</li>
          </ul>

          <p>
            Customers must report such issues within 2 hours of delivery, along
            with clear photo or video evidence, for verification.
          </p>

          <h2 className="text-white font-semibold">4. Refund Policy</h2>

          <p className="font-medium text-white">A. Eligible Refund Scenarios</p>

          <p>Refunds may be processed in the following cases:</p>

          <ul className="list-disc list-inside space-y-1">
            <li>Order cancelled before preparation</li>
            <li>Order cancelled by us</li>
            <li>Payment deducted but order not confirmed</li>
            <li>Verified quality issues accepted by our team</li>
          </ul>

          <p className="font-medium text-white">B. Non-Refundable Scenarios</p>

          <p>Refunds shall not be provided in the following situations:</p>

          <ul className="list-disc list-inside space-y-1">
            <li>
              Incorrect delivery address or contact details provided by the
              customer
            </li>
            <li>Failed delivery due to customer unavailability</li>
            <li>Change of mind after food preparation has started</li>
            <li>Partial or full consumption of food</li>
            <li>
              Delays caused due to traffic, weather conditions, venue
              restrictions, or third-party service providers beyond our control
            </li>
          </ul>

          <h2 className="text-white font-semibold">
            5. Refund Processing Timeline
          </h2>

          <p>
            Approved refunds shall be initiated to the original mode of payment
            only.
          </p>

          <p>
            Refunds are typically processed within 5 to 7 business days after
            approval.
          </p>

          <p>
            The time taken for the refunded amount to reflect in your account
            may vary depending on your bank, card issuer, or UPI provider.
          </p>

          <p>
            We shall not be responsible for delays caused by banks or payment
            gateway partners.
          </p>

          <h2 className="text-white font-semibold">6. Mode of Refund</h2>

          <p>
            Refunds will be issued using the same payment method used while
            placing the order, which may include:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>UPI</li>
            <li>Debit Card</li>
            <li>Credit Card</li>
            <li>Net Banking</li>
            <li>Wallets (if applicable)</li>
          </ul>

          <p>Cash refunds are not supported.</p>

          <h2 className="text-white font-semibold">
            7. Payment Gateway Disclaimer
          </h2>

          <p>
            Online payments are processed through secure third-party payment
            gateway service providers.
          </p>

          <p>
            Mittal Catering Ajmer does not store or have access to your card,
            UPI, or banking details.
          </p>

          <p>
            All payment-related data is handled directly by the respective
            payment gateway in accordance with their privacy policies.
          </p>

          <h2 className="text-white font-semibold">
            8. Dispute Resolution & Support
          </h2>

          <p>
            For any concerns related to cancellation, refund, or order issues,
            you may contact us with the following details:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Order ID or booking reference</li>
            <li>Registered mobile number</li>
            <li>Date and time of order</li>
            <li>
              Nature of the issue along with photo or video proof, if applicable
            </li>
          </ul>

          <p>
            We shall review the matter and aim to resolve it within a reasonable
            timeframe.
          </p>

          <h2 className="text-white font-semibold">
            9. Changes to This Policy
          </h2>

          <p>
            We reserve the right to modify, update, or revise this Return &
            Refund Policy at any time without prior notice. The updated Policy
            shall be effective immediately upon being published on the Website.
            Users are advised to review this Policy periodically.
          </p>

          <h2 className="text-white font-semibold">
            10. Governing Law & Jurisdiction
          </h2>

          <p>
            This Policy shall be governed by and construed in accordance with
            the laws of India. All disputes shall be subject to the exclusive
            jurisdiction of the courts of Ajmer, Rajasthan.
          </p>

          <h2 className="text-white font-semibold">11. Contact Information</h2>

          <p>
            For any queries or support regarding this Policy, please &nbsp; <Link className="underline text-accent" href="/contact-us">contact us.</Link>
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default page;
