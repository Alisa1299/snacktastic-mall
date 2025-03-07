
import { Link } from "react-router-dom";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="block group"
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="h-44 bg-gray-200">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-display font-semibold mb-1">
            {category.name}
          </h3>
          <p className="text-white/90 text-sm line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
