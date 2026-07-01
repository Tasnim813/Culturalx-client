import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const rules = [
  "Carry your valid ticket or QR code.",
  "Arrive at least 30 minutes before the event.",
  "Follow instructions from volunteers.",
  "Respect performers and fellow participants.",
  "Keep the festival venue clean.",
];

const guidelines = [
  "Outside food and drinks are not allowed.",
  "Smoking and alcohol are prohibited.",
  "Weapons or dangerous items are strictly prohibited.",
  "Photography restrictions must be respected.",
  "Take care of your personal belongings.",
];

export default function FestivalRules() {
  return (
    <section className="py-24 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary">
            Festival <span className="text-secondary">Rules & Guidelines</span>
          </h2>

          <p className="mt-4 text-gray-600">
            Please follow these guidelines to ensure everyone enjoys a safe and
            memorable Cultural-X experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-3xl font-bold text-primary mb-8">
              ✅ General Rules
            </h3>

            <div className="space-y-5">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b pb-4"
                >
                  <FaCheckCircle className="text-secondary mt-1" />

                  <p className="text-gray-600">{rule}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-3xl font-bold text-primary mb-8">
              🌿 Guidelines
            </h3>

            <div className="space-y-5">
              {guidelines.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b pb-4"
                >
                  <FaCheckCircle className="text-secondary mt-1" />

                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}