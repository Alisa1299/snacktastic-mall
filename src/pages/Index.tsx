
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCard from "@/components/CategoryCard";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturesSection from "@/components/FeaturesSection";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const Index = () => {
  // Get best selling products
  const bestSellers = products.filter(product => product.isBestSeller);
  
  // Get new arrivals
  const newArrivals = products.filter(product => product.isNew);
  
  // Get all products with discount
  const onSale = products.filter(product => product.discountPercentage);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroSection />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8 text-gray-800">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <ProductCarousel 
            title="Best Sellers" 
            products={bestSellers.length ? bestSellers : products.slice(0, 4)} 
          />
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-12 bg-snack-yellow/10">
        <div className="container mx-auto px-4">
          <ProductCarousel 
            title="New Arrivals" 
            products={newArrivals.length ? newArrivals : products.slice(2, 6)} 
          />
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-16 bg-snack-brown text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Authentic Malaysian Flavors
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-snack-cream mb-6">
            Our snacks are made with traditional recipes and the finest ingredients, 
            bringing the authentic taste of Malaysia to your home.
          </p>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="font-display text-3xl font-bold text-snack-yellow">50+</p>
              <p className="text-sm text-snack-cream/80">Unique Products</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="font-display text-3xl font-bold text-snack-yellow">14</p>
              <p className="text-sm text-snack-cream/80">Years of Excellence</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="font-display text-3xl font-bold text-snack-yellow">10k+</p>
              <p className="text-sm text-snack-cream/80">Happy Customers</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <p className="font-display text-3xl font-bold text-snack-yellow">24h</p>
              <p className="text-sm text-snack-cream/80">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special Offers */}
      {onSale.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <ProductCarousel 
              title="Special Offers" 
              products={onSale} 
            />
          </div>
        </section>
      )}
      
      {/* Testimonials */}
      <TestimonialSection />
    </div>
  );
};

export default Index;
