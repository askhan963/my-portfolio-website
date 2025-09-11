"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiFacebook, FiTwitter, FiGithub, FiMail, FiCheckCircle } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-center"
      >
        Get in Touch
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg text-foreground/70 mb-12 text-center max-w-2xl"
      >
        I'm currently available for freelance work and open to discussing new projects. Feel free to reach out!
      </motion.p>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {formSuccess ? (
            <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center h-full border border-border">
              <FiCheckCircle className="text-5xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
              <p className="text-foreground/70">Thank you for your message. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary bg-background text-foreground" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary bg-background text-foreground" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary bg-background text-foreground" required />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3 px-6 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300 disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <a href="mailto:awaiskhanniazi963@gmail.com" className="flex items-center p-6 bg-card text-card-foreground rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border">
            <FiMail className="text-3xl text-primary mr-6" />
            <div>
              <h4 className="text-xl font-bold text-foreground">Email</h4>
              <p className="text-foreground/70">awaiskhanniazi963@gmail.com</p>
            </div>
          </a>
          <div className="flex justify-center space-x-6 pt-4">
            {[ { href: "https://pk.linkedin.com/in/askhan963", icon: <FiLinkedin size={28}/> }, { href: "https://www.facebook.com/awaisknas963/", icon: <FiFacebook size={28}/> }, { href: "https://twitter.com/as_khan963", icon: <FiTwitter size={28}/> }, { href: "https://github.com/askhan963", icon: <FiGithub size={28}/> } ].map((link, idx) => (
              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors duration-300">
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
