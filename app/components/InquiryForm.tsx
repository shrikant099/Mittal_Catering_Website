"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface InquiryFormProps {
  source: string;
  submitLabel?: string;
  className?: string;
}

export default function InquiryForm({
  source,
  submitLabel = "Submit Enquiry",
  className = "grid sm:grid-cols-2 gap-4",
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Enquiry service is not configured");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          phone,
          message,
          source,
          time: new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        { publicKey }
      );

      toast.success("Enquiry sent! We will contact you shortly.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("EMAILJS SEND ERROR:", error);
      toast.error("Failed to send enquiry. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-primary"
      />
      <input
        name="phone"
        required
        pattern="[0-9]{10}"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Mobile Number"
        className="bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-primary"
      />
      <textarea
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message / Requirement"
        className="bg-black border border-white/10 p-3 rounded-xl sm:col-span-2 h-32 outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-primary text-black py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
