
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getItem } = useLocalStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{name: string, phone: string, address: string} | null>(null);

  useEffect(() => {
    // Check if customer info exists
    const info = getItem<{name: string, phone: string, address: string}>("customerInfo");
    if (info) {
      setCustomerInfo(info);
    }
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    if (!customerInfo) {
      toast({
        title: "Missing information",
        description: "Please provide your contact information",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customerInfo,
        items: cartItems.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: (item.product.discountPercentage 
            ? item.product.price * (1 - item.product.discountPercentage / 100) 
            : item.product.price) * item.quantity
        })),
        subtotal
      };

      // Create email content
      const emailBody = `
        New Order from Malaysian Snacks Website:
        
        Customer: ${customerInfo.name}
        Phone: ${customerInfo.phone}
        Address: ${customerInfo.address}
        
        Order Details:
        ${orderData.items.map(item => 
          `- ${item.name} x${item.quantity} = RM${item.total.toFixed(2)}`
        ).join('\n')}
        
        Subtotal: RM${subtotal.toFixed(2)}
      `;

      // Send email (this would typically be done through a backend service)
      // For demo purposes, we'll use a mailto link and show a custom message
      const mailtoLink = `mailto:emirul1299@gmail.com?subject=New Order from ${customerInfo.name}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);

      // Show success toast
      toast({
        title: "Order submitted!",
        description: "Your order has been processed successfully.",
      });

      // Clear cart after successful checkout
      clearCart();
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-display font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button 
          onClick={() => navigate("/main")}
          className="bg-snack-brown hover:bg-snack-brown/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>
    );
  }

  // Format price with Malaysian Ringgit
  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-display font-bold mb-8">Your Shopping Cart</h1>
      
      {customerInfo && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Your Information:</h2>
          <p><span className="font-medium">Name:</span> {customerInfo.name}</p>
          <p><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
          <p><span className="font-medium">Delivery Address:</span> {customerInfo.address}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Product</th>
                  <th className="text-center pb-4">Quantity</th>
                  <th className="text-right pb-4">Price</th>
                  <th className="text-right pb-4">Total</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const itemPrice = item.product.discountPercentage
                    ? item.product.price * (1 - item.product.discountPercentage / 100)
                    : item.product.price;
                  
                  return (
                    <tr key={item.product.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-16 w-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{item.product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-16 mx-2 text-center"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        {formatPrice(itemPrice)}
                      </td>
                      <td className="py-4 text-right font-medium">
                        {formatPrice(itemPrice * item.quantity)}
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/main")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              
              <Button
                variant="destructive"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-display font-bold mb-4">Order Summary</h2>
            
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            
            <div className="flex justify-between py-4 text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <Button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-snack-brown hover:bg-snack-brown/90 mt-6"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
