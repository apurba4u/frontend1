"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Shield,
  Clock,
  Headphones,
  Zap,
  Coffee,
} from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description:
      "Stay connected with blazing-fast internet throughout all our study spaces.",
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description:
      "Your belongings and privacy are protected with 24/7 security monitoring.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description:
      "Book rooms for any duration, from a quick 30-minute session to a full day.",
  },
  {
    icon: Headphones,
    title: "Noise Controlled",
    description:
      "Soundproofed rooms ensure zero distractions for deep focus work.",
  },
  {
    icon: Zap,
    title: "Power Everywhere",
    description:
      "Every seat has access to power outlets and USB charging ports.",
  },
  {
    icon: Coffee,
    title: "Refreshments",
    description:
      "Complimentary coffee and water to keep you energized during study sessions.",
  },
];

export default function WhySection() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Why Choose StudyNook?
          </h2>
          <p className="text-on-surface-variant text-base max-w-lg mx-auto">
            We provide everything you need for a productive study session, all in
            one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
