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
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-shell">
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-kicker"
      >
        Let us build
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-heading mb-6"
      >
        Get in Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center text-lg leading-8 text-foreground/70"
      >
        Have a product idea, dashboard, mobile app, or frontend problem that needs care? Send a note and I will get back to you.
      </motion.p>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -48, scale: 0.97, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 72, damping: 18 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {formSuccess ? (
            <div className="corner-frame flex min-h-[34rem] flex-col items-center justify-center p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <FiCheckCircle className="mb-4 text-5xl text-primary" />
              <h3 className="mb-2 text-2xl font-bold text-foreground">Message Sent!</h3>
              <p className="text-foreground/70">Thank you for your message. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="corner-frame relative overflow-hidden space-y-6 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,164,255,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Start a conversation</p>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">Tell me what you want to build.</h2>
              </div>
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="relative"
                >
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
                    className={`contact-field ${
                      errors[field.id as "name" | "email"]
                        ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/25"
                        : "border-border focus:border-primary focus:ring-primary/35"
                    }`}
                  />
                  {errors[field.id as "name" | "email"] && (
                    <p id={`${field.id}-error`} className="mt-2 text-sm text-red-300">
                      {errors[field.id as "name" | "email"]}
                    </p>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                viewport={{ once: true }}
                className="relative"
              >
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
                  className={`contact-field resize-none ${
                    errors.message
                      ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/25"
                      : "border-border focus:border-primary focus:ring-primary/35"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </motion.div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                size="lg"
                rightIcon={!isSubmitting ? <FiSend /> : undefined}
                className="relative w-full rounded-none border border-primary/50 bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_18px_55px_rgba(194,164,255,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/90 hover:shadow-[0_24px_80px_rgba(194,164,255,0.28)] focus:ring-primary/40 focus:ring-offset-0 disabled:hover:translate-y-0"
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.97, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 72, damping: 18, delay: 0.08 }}
          viewport={{ once: true, amount: 0.25 }}
          className="corner-frame relative overflow-hidden p-6 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(194,164,255,0.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_45%)]" />
          <div className="relative flex min-h-[34rem] flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Direct line</p>
              <h3 className="mt-5 text-4xl font-semibold leading-tight text-foreground">
                Available for focused frontend and full-stack work.
              </h3>
              <a href="mailto:awaiskhanniazi963@gmail.com" className="mt-8 flex items-center border border-border bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.07]">
                <FiMail className="mr-5 text-3xl text-primary" />
                <div className="min-w-0">
                  <h4 className="text-lg font-semibold text-foreground">Email</h4>
                  <p className="truncate text-foreground/70">awaiskhanniazi963@gmail.com</p>
                </div>
              </a>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Socials</p>
              <div className="grid grid-cols-4 gap-3">
                {[ { href: "https://pk.linkedin.com/in/askhan963", icon: <FiLinkedin size={24}/>, label: "LinkedIn" }, { href: "https://www.facebook.com/awaisknas963/", icon: <FiFacebook size={24}/>, label: "Facebook" }, { href: "https://twitter.com/as_khan963", icon: <FiTwitter size={24}/>, label: "Twitter" }, { href: "https://github.com/askhan963", icon: <FiGithub size={24}/>, label: "GitHub" } ].map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    viewport={{ once: true }}
                    className="flex h-14 items-center justify-center border border-border bg-card text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Contact;
