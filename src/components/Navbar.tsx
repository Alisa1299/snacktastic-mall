
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-display font-bold text-snack-brown">
              KerepekKu
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-medium">
              Shop
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-64 h-9 focus-visible:ring-primary"
              />
            </div>
            <Link to="/favorites" className="text-gray-700 hover:text-primary">
              <Heart size={22} />
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-primary">
              <User size={22} />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} className="text-gray-700 hover:text-primary" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 flex items-center justify-center p-0 rounded-full text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} className="text-gray-700" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 flex items-center justify-center p-0 rounded-full text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 w-full"
                />
              </div>
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="text-gray-700 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  to="/categories" 
                  className="text-gray-700 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex space-x-4 py-2">
                  <Link 
                    to="/favorites" 
                    className="flex items-center text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} className="mr-2" />
                    Favorites
                  </Link>
                  <Link 
                    to="/account" 
                    className="flex items-center text-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    Account
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
