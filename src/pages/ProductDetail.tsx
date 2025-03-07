
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingCart, 
  ChevronRight, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Star,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import ProductCarousel from "@/components/ProductCarousel";
import { reviews } from "@/data/reviews";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Find the product by ID
  const product = products.find(product => product.id === id);
  
  // Redirect to 404 if product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8 text-gray-600">
          Sorry, the product you are looking for does not exist.
        </p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;
  
  // Format currency
  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };
  
  // Find related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
      duration: 3000,
    });
  };
  
  // Handle favorite toggle
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      description: isFavorite 
        ? `${product.name} removed from favorites` 
        : `${product.name} added to favorites`,
      duration: 2000,
    });
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Link copied to clipboard",
        duration: 2000,
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>
      
      {/* Product Detail */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-gray-500">{product.category}</div>
            <h1 className="text-3xl font-display font-bold mb-3">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-gray-400 text-lg line-through ml-3">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            {/* Weight & Stock */}
            <div className="flex flex-wrap gap-4 mb-6">
              {product.weight && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  Weight: {product.weight}
                </div>
              )}
              
              {product.stock !== undefined && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {product.stock > 10 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-orange-500">Only {product.stock} left</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              )}
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center w-12">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="flex-1 bg-snack-brown hover:bg-snack-brown/90 text-white"
                  onClick={handleAddToCart}
                  disabled={!product.stock}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-red-500 border-red-200" : ""}
                >
                  <Heart size={18} className={isFavorite ? "fill-red-500" : ""} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-700">
                <CheckCircle2 size={16} className="text-green-500 mr-2" />
                <span>100% Authentic Malaysian Flavors</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle2 size={16} className="text-green-500 mr-2" />
                <span>Free shipping on orders over RM100</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle2 size={16} className="text-green-500 mr-2" />
                <span>Freshly made to ensure quality</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <Tabs defaultValue="details" className="px-6 pb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <p>
                {product.description} Our {product.name} is made with carefully selected ingredients
                and traditional recipes passed down through generations.
              </p>
              <p>
                Perfect for sharing with family and friends, our {product.name} brings the authentic taste
                of Malaysian street food to your home.
              </p>
              <p>
                Store in a cool, dry place. Once opened, consume within 7 days for the best flavor experience.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6">
            {product.ingredients && product.ingredients.length > 0 ? (
              <div>
                <h3 className="font-semibold mb-3">Ingredients:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-500">
                  <p>* May contain traces of nuts, dairy, and gluten.</p>
                  <p>* Manufactured in a facility that processes nuts.</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Ingredients information not available.</p>
            )}
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-700">
                  Based on {reviews.length} reviews
                </span>
              </div>
              
              <Separator />
              
              {reviews.map((review) => (
                <div key={review.id} className="py-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">{review.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-display font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                  <div className="h-48 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="mt-1 font-medium text-primary">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
