import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Show success message (in a real app, would use a toast notification)
    alert("Your message has been sent successfully!");
  };

  return (
    <section
      id="contact"
      className="section-container bg-gray-50 dark:bg-gray-900"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get in <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions about NUML or our programs? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 animate-fade-in">
          <h3 className="text-xl font-bold mb-6">Send us a message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
                placeholder="Admission Inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500 resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact info and map */}
        <div
          className="space-y-8 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          {/* Contact information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-numl-600 dark:text-numl-400" />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Sector H-9, Islamabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-numl-600 dark:text-numl-400" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    +92-51-9265100
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-numl-600 dark:text-numl-400" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    info@numl.edu.pk
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot */}
          <div className="bg-gradient-to-br from-numl-600 to-numl-800 dark:from-numl-700 dark:to-numl-900 rounded-xl shadow-md p-6 md:p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">NUML Assistant</h3>
            </div>

            <p className="mb-6">
              Get instant answers to your frequently asked questions through our
              AI-powered assistant.
            </p>

            <button
              className="w-full py-2 px-4 bg-white text-numl-600 font-medium rounded-lg transition-colors hover:bg-gray-100"
              onClick={() => {
                /* Launch chatbot */
              }}
            >
              Start Conversation
            </button>
          </div>

          {/* Map */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.402191116157!2d73.03903857595556!3d33.6951675733976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbef8c1b1164d%3A0x41fe67a8a67e3468!2sNational%20University%20of%20Modern%20Languages%20(NUML)!5e0!3m2!1sen!2s!4v1698782183096!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
