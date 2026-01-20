import { Metadata } from "next";
import CheckoutClient from "./components/CheckoutClient";

export const metadata: Metadata = {
  title:
    "Checkout | Mittal Catering – Fresh Vegetarian Meals in Train & Events",
  description:
    "Secure checkout for Mittal Catering. Review your cart, add passenger details and place your order for fresh vegetarian meals with 5% GST.",
  keywords:
    "Mittal Catering checkout, vegetarian catering Ajmer, train food order, Jain food, party catering",
};

export default function Page() {
  return <CheckoutClient />;
}
