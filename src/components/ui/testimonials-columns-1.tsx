"use client";
import React from "react";
import { motion } from "motion/react";

/**
 * TestimonialsColumn Component
 * 
 * An animated column that vertically scrolls a list of testimonials infinitely.
 * Uses Framer Motion for smooth, hardware-accelerated continuous scrolling.
 * Designed to be stacked alongside other columns with varying durations for a staggered effect.
 * 
 * @param props.className - Optional CSS classes for container styling.
 * @param props.testimonials - Array of testimonial data (text, image, name, role).
 * @param props.duration - The time in seconds for a full scroll cycle (default: 10).
 */
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-2xl border border-brand-red/10 bg-white shadow-lg shadow-brand-red/5 max-w-xs w-full transition-all duration-200 hover:border-brand-red/30 hover:shadow-xl hover:-translate-y-1"
                  key={i}
                >
                  <div className="text-black/70 text-sm leading-relaxed mb-6 italic">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full grayscale hover:grayscale-0 transition-all duration-300 border border-brand-red/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight leading-tight text-brand-ink text-sm">
                        {name}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-brand-red font-bold">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
