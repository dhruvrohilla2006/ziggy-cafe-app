import { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Egg,
  Sandwich,
  UtensilsCrossed,
  Coffee,
  Wine,
  IceCream,
  Cake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../../component/ProductCard";
import foodStore from "../../stores/foodStore";
import cartStore from "../../stores/cartStore";

const CATEGORIES = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "breakfast", label: "Breakfast", icon: Egg },
  { id: "lunch", label: "Lunch", icon: Sandwich },
  { id: "dinner", label: "Dinner", icon: UtensilsCrossed },
  { id: "brunch", label: "Brunch", icon: Coffee },
  { id: "beverage", label: "Beverage", icon: Wine },
  { id: "dessert", label: "Dessert", icon: IceCream },
  { id: "sweet", label: "Sweet", icon: Cake },
];

const ExploreMenu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollerRef = useRef(null);

  const { AddItemToCart } = cartStore();

  const { allFood, fetchAllFood } = foodStore();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allFood;
    return allFood.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const scrollTags = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchAllFood();
  }, [fetchAllFood]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tag / chip filter row — sticky like YouTube's Explore bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="relative flex items-center px-4 py-3 md:px-8">
          {/* Left scroll arrow (desktop only) */}
          <button
            onClick={() => scrollTags("left")}
            className="mr-2 hidden shrink-0 rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:bg-slate-50 md:flex"
            aria-label="Scroll tags left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Scrollable chip row */}
          <div
            ref={scrollerRef}
            className="flex flex-1 gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Right scroll arrow (desktop only) */}
          <button
            onClick={() => scrollTags("right")}
            className="ml-2 hidden shrink-0 rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:bg-slate-50 md:flex"
            aria-label="Scroll tags right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="px-4 py-8 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            All Creations
          </h2>
          <span className="text-sm text-slate-500">
            Showing {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">
            No dishes in this category yet.
          </p>
        ) : (
          <div
            style={{
              maxHeight: "78vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                image={item.images}
                category={item.category}
                name={item.name}
                price={item.price}
                description={item.description}
                food_id={item._id}
                onAdd={() =>
                  AddItemToCart({
                    image: item.images[0],
                    name: item.name,
                    price: item.price,
                    _id: item._id,
                  })
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreMenu;
