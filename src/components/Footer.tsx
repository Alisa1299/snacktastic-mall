
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-snack-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">KerepekKu</h3>
            <p className="mb-4 text-snack-cream/90">
              Bringing the authentic taste of Malaysian snacks and kerepek to your doorstep since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-snack-cream hover:text-snack-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-snack-cream hover:text-snack-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-snack-cream hover:text-snack-yellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-snack-cream/90 hover:text-snack-yellow transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-snack-cream/90">
                  123 Jalan Snack, Taman Kerepek, 50000 Kuala Lumpur, Malaysia
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-snack-cream/90">+60 3-1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-snack-cream/90">info@kerepekku.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-snack-cream/90">
              Subscribe to our newsletter for promotions, new products, and Malaysian snack recipes.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-snack-orange hover:bg-snack-orange/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-center text-sm text-snack-cream/70">
          <p>© {new Date().getFullYear()} KerepekKu. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-snack-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-snack-yellow transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="hover:text-snack-yellow transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
