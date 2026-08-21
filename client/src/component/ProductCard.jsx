import { Plus } from "lucide-react";

const ProductCard = ({ image, category, name, price, description, onAdd }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-400 bg-white transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={image[0]?.url}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-800 backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <span className="whitespace-nowrap text-sm text-slate-500">
            ₹{price}
          </span>
        </div>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>
        <button
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-3 text-xs font-semibold uppercase tracking-widest text-slate-800 transition-all hover:border-transparent hover:bg-slate-900 hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
