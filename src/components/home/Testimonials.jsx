"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Park",
    role: "Medical Student",
    avatar: "JP",
    rating: 5,
    text: "StudyNook has completely transformed how I prepare for exams. The quiet pods are perfect for deep focus, and I love being able to book in advance.",
  },
  {
    name: "David Chen",
    role: "Graduate Researcher",
    avatar: "DC",
    rating: 5,
    text: "The collaborative rooms are fantastic for our research team meetings. Great amenities, and the booking system prevents any scheduling conflicts.",
  },
  {
    name: "Amira Hassan",
    role: "Law Student",
    avatar: "AH",
    rating: 5,
    text: "I study here almost every day. The environment is conducive to learning, and the staff ensures everything is always clean and well-maintained.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            What Our Members Say
          </h2>
          <p className="text-on-surface-variant text-base max-w-lg mx-auto">
            Join thousands of satisfied students who have found their ideal study
            space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
