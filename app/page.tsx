"use client"

import { useState, useEffect } from "react"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductToolbar } from "@/components/product-toolbar"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState([0, 114900])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [compareMode, setCompareMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-800">Sofas</h1>
        </div>

        <div className="flex gap-8">
          <aside
            className={`w-80 flex-shrink-0 transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <ProductFilters
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </aside>

          <div
            className={`flex-1 transition-all duration-800 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <ProductToolbar
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              compareMode={compareMode}
              onCompareModeChange={setCompareMode}
            />
            <ProductGrid
              searchQuery={searchQuery}
              selectedFilters={selectedFilters}
              priceRange={priceRange}
              sortBy={sortBy}
              viewMode={viewMode}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
