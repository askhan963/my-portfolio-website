"use client";
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { usePublicProfile } from '@/hooks/usePublicProfile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Profile() {
  const { profile, loading, error } = usePublicProfile();

  // Fallback data if no profile is found
  const fallbackProfile = {
    name: "Muhammad Awais Khan",
    image: "/profile-picture.jpeg",
    headlines: [
      'MERN Stack Developer',
      'Computer Scientist',
      'Full-Stack Enthusiast',
      'Problem Solver',
      'Tech Innovator'
    ],
    tagline: "Passionate about creating web solutions that solve real-world problems. Let's build something great together!"
  };

  const displayProfile = profile || fallbackProfile;

  if (loading) {
    return (
      <section 
        id='home' 
        className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/70">Loading profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading profile:', error);
  }

  return (
    <section 
      id='home' 
      className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto"
        >
          <Image
            src={displayProfile.image}
            alt="Profile Picture"
            fill
            className="rounded-full shadow-2xl border-4 border-border object-cover"
            priority
          />
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            {displayProfile.name}
          </h1>

          <TypeAnimation
            sequence={displayProfile.headlines.flatMap(headline => [headline, 2000])}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className="text-xl sm:text-2xl font-semibold text-primary mt-2 h-8"
          />

          <p className="mt-4 text-lg text-foreground/70 max-w-lg mx-auto md:mx-0">
            {displayProfile.tagline}
          </p>

          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-block mt-8 px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
