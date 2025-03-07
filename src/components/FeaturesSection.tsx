
import { Truck, Package, CreditCard, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-snack-orange" />,
    title: "Free Delivery",
    description: "Free shipping on all orders over RM100"
  },
  {
    icon: <Package className="w-8 h-8 text-snack-orange" />,
    title: "Freshly Made",
    description: "Our products are made fresh every day"
  },
  {
    icon: <CreditCard className="w-8 h-8 text-snack-orange" />,
    title: "Secure Payment",
    description: "Multiple secure payment methods"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-snack-orange" />,
    title: "24/7 Support",
    description: "Contact us anytime for assistance"
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 p-3 bg-snack-yellow/20 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
