
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Function to format price with Malaysian Ringgit
  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your favorites`,
      duration: 3000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="relative">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-48 w-full object-cover product-image"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-blue-500">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-snack-orange">Best Seller</Badge>
          )}
          {product.discountPercentage && (
            <Badge className="bg-red-500">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>
      
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Description - truncated */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          {discountedPrice ? (
            <>
              <span className="font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-gray-400 text-sm line-through ml-2">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
          
          {product.weight && (
            <span className="text-xs text-gray-500 ml-auto">
              {product.weight}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-snack-brown hover:bg-snack-brown/90 text-white"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
