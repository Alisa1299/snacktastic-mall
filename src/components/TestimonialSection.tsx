
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviews } from "@/data/reviews";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-snack-peach/50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-800">
          What Our Customers Say
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarImage src={reviews[currentIndex].avatar} alt={reviews[currentIndex].customerName} />
              <AvatarFallback className="bg-snack-brown text-white">
                {getInitials(reviews[currentIndex].customerName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex mb-4">
              {renderStars(reviews[currentIndex].rating)}
            </div>

            <blockquote className="text-lg italic text-gray-700 mb-6">
              "{reviews[currentIndex].comment}"
            </blockquote>

            <div className="mb-1 font-semibold text-gray-900">
              {reviews[currentIndex].customerName}
            </div>
            
            <div className="text-sm text-gray-500">
              {new Date(reviews[currentIndex].date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="bg-white shadow-md hover:bg-gray-100 border-gray-200"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="bg-white shadow-md hover:bg-gray-100 border-gray-200"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-snack-brown" : "bg-gray-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
