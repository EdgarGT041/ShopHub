export interface ProductFilterValues {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

interface FiltersProps {
  values: ProductFilterValues;
  onChange: (field: keyof ProductFilterValues, value: string) => void;
  onClear: () => void;
}

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

export const Filters = ({ values, onChange, onClear }: FiltersProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label htmlFor="search" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={values.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Search by name or description"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Category
          </label>
          <select
            id="category"
            value={values.category}
            onChange={(event) => onChange('category', event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="minPrice" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Min price
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={values.minPrice}
            onChange={(event) => onChange('minPrice', event.target.value)}
            placeholder="0"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Max price
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={values.maxPrice}
            onChange={(event) => onChange('maxPrice', event.target.value)}
            placeholder="999"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onClear}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};
