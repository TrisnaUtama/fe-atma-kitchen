import { useState, useEffect } from "react";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import Promo from "../../../assets/images/discount_logo.gif";
import Promo1 from "../../../assets/images/promo2.gif";
import Promo2 from "../../../assets/images/promo3.gif";

const slides = [Promo, Promo1, Promo2];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function handlePrevSlide() {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  }

  function handleNextSlide() {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  }

  return (
    <div className="relative w-full overflow-hidden" data-carousel="slide">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={slide}
              className="block w-full h-56 object-cover rounded-lg"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevSlide}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <ChevronLeft className="w-4 h-4 text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNextSlide}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <ChevronLeft className="w-4 h-4 text-white transform rotate-180" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
