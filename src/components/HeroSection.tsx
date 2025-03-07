
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Malaysian Snacks Delivered To Your Door",
    subtitle: "Authentic. Homemade. Delicious.",
    image: "/hero-1.jpg",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "Discover Our Famous Kerepek",
    subtitle: "Crispy, flavorful, and utterly irresistible",
    image: "/hero-2.jpg",
    buttonText: "View Kerepek",
    buttonLink: "/category/1",
  },
  {
    id: 3,
    title: "Perfect Gift Sets for Any Occasion",
    subtitle: "Share the taste of Malaysia with your loved ones",
    image: "/hero-3.jpg",
    buttonText: "Explore Gift Packs",
    buttonLink: "/category/4",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-[450px] md:h-[550px] overflow-hidden bg-gray-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="max-w-3xl text-center">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 animate-float">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <Link to={slide.buttonLink}>
                <Button className="bg-snack-orange hover:bg-snack-orange/90 text-white px-8 py-6 text-lg">
                  <ShoppingBag className="mr-2" size={20} />
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
