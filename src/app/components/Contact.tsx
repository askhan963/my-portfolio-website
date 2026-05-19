"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiFacebook, FiTwitter, FiGithub, FiMail, FiCheckCircle } from "react-icons/fi";
import Button from "@/components/ui/Button";

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
      className="relative bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="section-heading mb-6"
      >
        Get in Touch
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center text-lg leading-8 text-foreground/70"
      >
        I'm currently available for freelance work and open to discussing new projects. Feel free to reach out!
      </motion.p>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {formSuccess ? (
            <div className="glass-panel flex h-full flex-col items-center justify-center p-8 text-center">
              <FiCheckCircle className="text-5xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
              <p className="text-foreground/70">Thank you for your message. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" required />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
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
          <a href="mailto:awaiskhanniazi963@gmail.com" className="corner-frame flex items-center p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.07]">
            <FiMail className="text-3xl text-primary mr-6" />
            <div>
              <h4 className="text-xl font-bold text-foreground">Email</h4>
              <p className="text-foreground/70">awaiskhanniazi963@gmail.com</p>
            </div>
          </a>
          <div className="flex justify-center space-x-6 pt-4">
            {[ { href: "https://pk.linkedin.com/in/askhan963", icon: <FiLinkedin size={28}/> }, { href: "https://www.facebook.com/awaisknas963/", icon: <FiFacebook size={28}/> }, { href: "https://twitter.com/as_khan963", icon: <FiTwitter size={28}/> }, { href: "https://github.com/askhan963", icon: <FiGithub size={28}/> } ].map((link, idx) => (
              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center border border-border bg-card text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-primary">
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Contact;
