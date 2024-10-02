import { useForm, ValidationError } from "@formspree/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("xldrqvev");

  // Trigger toast notification upon successful submission
  if (state.succeeded) {
    toast.success("Thanks for reaching out! I'll get back to you soon.");
    return (
      <p className="text-primary mt-4">
        Thanks for reaching out! I'll get back to you soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Your Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message here..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      {/* Disable submit button after form submission */}
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
      >
        {state.submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-content">
        <h1 className="text-h1 font-heading mb-8">Contact Us</h1>
        <p className="text-body leading-relaxed mb-8">
          Have any questions, suggestions, or just want to say hi? Drop us a
          message and we&apos;ll get back to you!
        </p>
        <ContactForm />
      </div>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Contact;
