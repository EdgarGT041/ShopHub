import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import type { FilterState } from '../../types';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'] as const;

export const Filters = ({ onFilterChange }: FiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<string | undefined>(undefined);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onFilterChange({
      search: debouncedSearch || undefined,
      category: selectedCategory,
      minPrice: appliedMinPrice,
      maxPrice: appliedMaxPrice,
    });
  }, [debouncedSearch, selectedCategory, appliedMinPrice, appliedMaxPrice, onFilterChange]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? undefined : category));
  };

  const handleApplyPrice = () => {
    setAppliedMinPrice(minPriceInput || undefined);
    setAppliedMaxPrice(maxPriceInput || undefined);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm outline-none ring-blue-500 transition focus:ring-2"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowAdvancedFilters((prev) => !prev)}
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showAdvancedFilters ? (
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Price Range</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="number"
                min="0"
                value={minPriceInput}
                onChange={(event) => setMinPriceInput(event.target.value)}
                placeholder="Min"
                aria-label="Minimum price"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
              <input
                type="number"
                min="0"
                value={maxPriceInput}
                onChange={(event) => setMaxPriceInput(event.target.value)}
                placeholder="Max"
                aria-label="Maximum price"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2"
              />
              <button
                type="button"
                onClick={handleApplyPrice}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
