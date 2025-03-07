
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const EntryForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setItem } = useLocalStorage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Store customer information in localStorage
    const customerInfo = { name, phone, address };
    setItem("customerInfo", customerInfo);
    
    // Show success message
    toast({
      title: "Welcome!",
      description: "Your information has been saved.",
    });

    // Navigate to the main page
    setTimeout(() => {
      navigate("/main");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-snack-tan/30">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-snack-brown">Welcome to Malaysian Snacks</h1>
          <p className="mt-2 text-gray-600">Please enter your information to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <Input
                id="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-snack-brown hover:bg-snack-brown/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue to Shop"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
