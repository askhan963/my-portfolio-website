"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiGithub,
  FiMail,
  FiCheck,
} from "react-icons/fi";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mkgwvrll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6"
    >
      <div
        className="text-center mb-12"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: "all 0.8s ease",
        }}
      >
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
          Contact Me
        </h1>
        <p className="text-xl sm:text-2xl font-body text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
      </div>

      {/* Mail me now button */}
      <div
        className="mb-12"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: "all 0.8s ease 0.2s",
        }}
      >
        <a
          href="mailto:awaiskhanniazi963@gmail.com"
          className="inline-flex items-center bg-gradient-to-r from-blue-400 to-teal-800 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FiMail className="mr-3 text-xl" />
          Mail me now
        </a>
      </div>

      {/* Social Links */}
      <div
        className="mb-12"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: "all 0.8s ease 0.4s",
        }}
      >
        <div className="flex space-x-8 justify-center">
          {[
            {
              href: "https://pk.linkedin.com/in/askhan963",
              icon: <FiLinkedin />,
            },
            {
              href: "https://www.facebook.com/awaisknas963/",
              icon: <FiFacebook />,
            },
            {
              href: "https://twitter.com/as_khan963",
              icon: <FiTwitter />,
            },
            {
              href: "https://github.com/askhan963",
              icon: <FiGithub />,
            },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-blue-400 dark:text-teal-400 hover:text-blue-500 dark:hover:text-teal-300 transition duration-300 hover:scale-110 hover:rotate-6"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div
        className="w-full max-w-2xl mx-auto"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: "all 0.8s ease 0.6s",
        }}
      >
        {formSuccess ? (
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <FiCheck className="text-4xl text-blue-400 dark:text-teal-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for reaching out! I'll get back to you as soon as
              possible.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 dark:focus:border-teal-400 dark:focus:ring-teal-400 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 dark:focus:border-teal-400 dark:focus:ring-teal-400 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 dark:focus:border-teal-400 dark:focus:ring-teal-400 text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-400 to-teal-800 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
