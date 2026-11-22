"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiFacebook, FiTwitter, FiGithub, FiMail, FiCheckCircle, FiSend } from "react-icons/fi";
import Button from "@/components/ui/Button";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = { name: "", email: "", message: "" };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = "Please add a message with at least 10 characters.";
    }

    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mkgwvrll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 5000);
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
    <section id="contact" className="relative bg-background py-24 sm:py-32">
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading"
        >
          Get in touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true }}
          className="mt-5 max-w-[56ch] text-lg leading-8 text-foreground/70"
        >
          Have a product idea, an AI feature to ship, or a full-stack problem that needs care? Send a note and I'll get back to you.
        </motion.p>

        <div className="mt-14 grid w-full gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            {formSuccess ? (
              <div className="hairline-panel flex min-h-[28rem] flex-col items-center justify-center p-8 text-center">
                <FiCheckCircle className="mb-4 text-4xl text-primary" />
                <h3 className="mb-2 text-2xl font-semibold text-foreground">Message sent</h3>
                <p className="text-foreground/70">Thank you for your message. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="hairline-panel space-y-6 p-6 sm:p-8">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-foreground">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      value={formData[field.id as "name" | "email"]}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors[field.id as "name" | "email"])}
                      aria-describedby={`${field.id}-error`}
                      placeholder={field.placeholder}
                      className="contact-field"
                    />
                    {errors[field.id as "name" | "email"] && (
                      <p id={`${field.id}-error`} className="mt-2 text-sm text-red-400">
                        {errors[field.id as "name" | "email"]}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby="message-error"
                    placeholder="Share a little context about the project..."
                    className="contact-field resize-none"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  rightIcon={!isSubmitting ? <FiSend /> : undefined}
                  className="w-full rounded-none border border-primary bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:ring-primary/40 focus:ring-offset-0"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                >
                  Send message
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true, amount: 0.25 }}
            className="hairline-panel flex flex-col justify-between p-6 sm:p-8"
          >
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-foreground">
                Available for focused frontend, full-stack, and applied-AI work.
              </h3>
              <a
                href="mailto:awaiskhanniazi963@gmail.com"
                className="mt-8 flex items-center border border-border p-5 transition-colors hover:border-primary"
              >
                <FiMail className="mr-5 text-2xl text-primary" />
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-foreground">Email</h4>
                  <p className="truncate text-foreground/70">awaiskhanniazi963@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="mt-10">
              <p className="mb-4 text-sm font-semibold text-foreground/70">Socials</p>
              <div className="flex gap-3">
                {[
                  { href: "https://pk.linkedin.com/in/askhan963", icon: <FiLinkedin size={20} />, label: "LinkedIn" },
                  { href: "https://www.facebook.com/awaisknas963/", icon: <FiFacebook size={20} />, label: "Facebook" },
                  { href: "https://twitter.com/as_khan963", icon: <FiTwitter size={20} />, label: "Twitter" },
                  { href: "https://github.com/askhan963", icon: <FiGithub size={20} />, label: "GitHub" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-12 w-12 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
