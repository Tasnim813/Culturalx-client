import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

// const slides = [
//   {
//     img: "https://i.ibb.co.com/Hp1QStsm/a6e8c32546ae4a5c6417164fdac0af2a.jpg",
//     title: "Fresh Ingredients Delivered",
//     subtitle: "Get farm-fresh ingredients directly to your kitchen with LocalChefBazar.",
//     cta: "Shop Fresh Now",
//   },
//   {
//     img: "https://i.ibb.co.com/DDtHPmc8/9b04e1b66e12a9c4d3144edf73590bb1.jpg",
//     subtitle: "Explore a variety of chef-curated recipes to cook delicious meals at home.",
//     cta: "Explore Recipes",
//   },
//   {
//     img: "https://i.ibb.co.com/1fGk0q9m/0f66c1PbWWqgKDBDorh525uecKaGZD21FGSoCeR.jpg",
//     title: "Cooking Made Easy",
//     subtitle: "From beginner to pro, LocalChefBazar makes cooking simple and fun.",
//     cta: "Start Cooking",
//   },
// ]
const slides = [
  {
    img: "https://i.ibb.co.com/Hp1QStsm/a6e8c32546ae4a5c6417164fdac0af2a.jpg",
    title: "Discover Your Next Great Read",
    subtitle: "Explore thousands of books and resources at your fingertips with our library.",
    cta: "Browse Books",
  },
  {
    img: "https://i.ibb.co.com/DDtHPmc8/9b04e1b66e12a9c4d3144edf73590bb1.jpg",
    title: "Knowledge for Everyone",
    subtitle: "Access a wide range of academic and recreational books anytime, anywhere.",
    cta: "Explore Collection",
  },
  {
    img: "https://i.ibb.co.com/1fGk0q9m/0f66c1PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR.jpg",
    title: "Read, Learn, Grow",
    subtitle: "From beginners to researchers, our library supports every learning journey.",
    cta: "Start Reading",
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
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                  className="text-3xl sm:text-5xl font-bold mb-2 text-white"
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

                <motion.p
                  className="text-sm sm:text-lg mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  className="px-6 py-2 font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-400 hover:to-orange-400 transition"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        {"<"}
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        {">"}
      </button>
    </div>
  )
}

export default Banner
