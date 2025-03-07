
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, X, ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  // Function to format price
  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };
  
  // Calculate cart summary values
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.06; // 6% sales tax
  const total = subtotal + shipping + tax;
  
  // Handle coupon application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    setTimeout(() => {
      setIsApplyingCoupon(false);
      // You would validate the coupon code here
      setCouponCode("");
      // Show a toast notification
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any Malaysian snacks to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary/90 px-8">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Cart Header */}
            <div className="p-4 border-b hidden sm:grid grid-cols-12 gap-4 text-sm text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y">
              {cartItems.map((item) => {
                const itemPrice = item.product.discountPercentage
                  ? item.product.price * (1 - item.product.discountPercentage / 100)
                  : item.product.price;
                const itemSubtotal = itemPrice * item.quantity;
                
                return (
                  <div key={item.product.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                    {/* Mobile Product Section */}
                    <div className="flex items-center space-x-4 sm:hidden mb-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.product.weight && (
                          <p className="text-sm text-gray-500">{item.product.weight}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <div className="font-medium text-primary">
                            {formatPrice(itemPrice)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Product */}
                    <div className="hidden sm:col-span-6 sm:flex sm:items-center sm:space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.product.weight && (
                          <p className="text-sm text-gray-500">{item.product.weight}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Desktop Price */}
                    <div className="hidden sm:col-span-2 sm:flex sm:justify-center">
                      <div className={item.product.discountPercentage ? "text-primary font-medium" : ""}>
                        {formatPrice(itemPrice)}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center justify-between sm:col-span-2 sm:justify-center">
                      <span className="sm:hidden">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-center w-10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal and Remove Button */}
                    <div className="sm:col-span-2 flex items-center justify-between mt-4 sm:mt-0 sm:justify-center">
                      <span className="sm:hidden">Subtotal:</span>
                      <div className="font-semibold">
                        {formatPrice(itemSubtotal)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 ml-4 hidden sm:block"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Cart Actions */}
            <div className="p-4 border-t flex flex-wrap justify-between items-center gap-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-40 sm:w-64"
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                >
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={clearCart}
              >
                <Trash2 size={16} className="mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      Free
                    </Badge>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (6%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-lg text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Proceed to Checkout
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
            
            <div className="mt-6 text-sm text-gray-500">
              <p className="flex items-center justify-center mb-2">
                <ShoppingBag size={14} className="mr-1" />
                Free shipping on orders over RM100
              </p>
              <p className="text-center text-xs">
                By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
