import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Cultural-X was an unforgettable experience. Everything was beautifully organized.",
  },
  {
    id: 2,
    name: "Sabbir Ahmed",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Booking tickets was super easy and the performances were amazing.",
  },
  {
    id: 3,
    name: "Farzana Islam",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    review:
      "The cultural performances and art exhibitions made this festival memorable.",
  },
  {
    id: 4,
    name: "Mahmud Hasan",
    role: "Festival Visitor",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    review:
      "One of the best festivals I've attended. Looking forward to next year.",
  },
  {
    id: 5,
    name: "Ayesha Rahman",
    role: "Teacher",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Very smooth booking process and excellent event management.",
  },
];

const cards = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 bg-base-100 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-bold text-primary">
          What Our
          <span className="text-secondary"> Participants Say</span>
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Hear from the amazing people who experienced Cultural-X and made
          unforgettable memories with us.
        </p>
      </div>

      {/* Infinite Slider */}
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {cards.map((item, index) => (
          <div
            key={index}
            className="w-[350px] bg-white border border-green-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 shrink-0"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-secondary"
              />
            </div>

            {/* Rating */}
            <div className="text-center text-amber-400 text-xl mt-5">
              ⭐⭐⭐⭐⭐
            </div>

            {/* Review */}
            <p className="text-gray-600 leading-8 mt-5 italic text-center">
              "{item.review}"
            </p>

            {/* Name */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-primary">
                {item.name}
              </h3>

              <p className="text-secondary font-medium">
                {item.role}
              </p>
            </div>

            {/* Badge */}
            <div className="mt-6 flex justify-center">
              <span className="bg-primary text-white px-5 py-2 rounded-full text-sm">
                🌸 Spring Fest 2026
              </span>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}