
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const slides = [
  {
    img: "https://i.ibb.co.com/G4BkCRR4/04dbf4f0f41adde0117d93cc336d6eca.jpg",
    title: "Discover Amazing Events Near You",
    subtitle: "Find and join the best events, concerts, and festivals happening around you.",
    cta: "Browse Events",
  },
  {
    img: "https://i.ibb.co.com/7t2Vw7wS/afbbc11154775649ac2594705fd74ac0.jpg",
    title: "Book Your Favorite Events Instantly",
    subtitle: "Secure your seat in concerts, workshops, and community events with just a click.",
    cta: "Explore Events",
  },
  {
    img: "https://i.ibb.co.com/Z6ZZX89Z/0eaf5fdca93f0167e3a412ae4ec6da3b.jpg",
    title: "Create Memories That Last Forever",
    subtitle: "Join exciting events and connect with people who share your passion.",
    cta: "Get Started",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mt-[-30px] w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">

      {slides.map(
        (slide, index) =>
          index === current && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* 🟢 Green overlay */}
              <div className="absolute inset-0 bg-[#0F3D2E]/60 flex flex-col justify-center items-center text-center px-4">

                {/* Title */}
                <motion.h1
                  className="text-3xl sm:text-5xl font-bold mb-2 text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Typewriter
                    words={[slide.title]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-sm sm:text-lg mb-4 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {slide.subtitle}
                </motion.p>

                {/* Button */}
                <motion.button
                  className="px-6 py-2 font-semibold rounded-xl shadow-lg text-white bg-[#0F3D2E] hover:bg-[#145A32] transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.cta}
                </motion.button>
              </div>
            </motion.div>
          )
      )}

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0F3D2E]/70 hover:bg-[#145A32] text-white p-2 rounded-full transition"
      >
        {"<"}
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0F3D2E]/70 hover:bg-[#145A32] text-white p-2 rounded-full transition"
      >
        {">"}
      </button>

    </div>
  )
}

export default Banner