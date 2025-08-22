"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ProductFiltersProps {
  selectedFilters: Record<string, string[]>
  onFiltersChange: (filters: Record<string, string[]>) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
}

const filterSections = [
  {
    title: "Price",
    type: "range",
    content: { min: 0, max: 114900, current: [0, 114900] },
  },
  {
    title: "Availability",
    type: "checkbox",
    content: [
      { label: "Buy Online", count: 12 },
      { label: "Store Exclusive", count: 29 },
    ],
  },
  {
    title: "Type Material",
    type: "checkbox",
    content: [
      { label: "Engineered Wood", count: 3 },
      { label: "Fabric", count: 3 },
      { label: "Frame - Solidwood, Upholstery - Polyester", count: 1 },
      { label: "Frame - Solidwood, Upholstery - Velvet Fabric", count: 4 },
      { label: "Frame : Solidwood", count: 1 },
      { label: "Half Leather", count: 1 },
      { label: "Solidwood", count: 3 },
      { label: "Velvet Fabric", count: 2 },
    ],
  },
  {
    title: "Warranty Period",
    type: "checkbox",
    content: [
      { label: "1 Year", count: 1 },
      { label: "3 Years", count: 33 },
    ],
  },
  {
    title: "Material",
    type: "checkbox",
    content: [
      { label: "Boucle", count: 1 },
      { label: "Fabric", count: 16 },
      { label: "Half Leather", count: 2 },
      { label: "Leatherette", count: 1 },
      { label: "Mango +Acacia+Ply+Cane", count: 1 },
      { label: "Velvet", count: 7 },
      { label: "Velvet Fabric", count: 3 },
    ],
  },
  {
    title: "Color",
    type: "checkbox",
    content: [
      { label: "Beige", count: 8 },
      { label: "Brown", count: 4 },
      { label: "Dark Grey", count: 2 },
      { label: "Grey", count: 8 },
      { label: "Light Brown", count: 2 },
      { label: "Light Grey", count: 1 },
      { label: "Mushroom", count: 1 },
      { label: "Na", count: 1 },
      { label: "Olive", count: 1 },
      { label: "Rust", count: 1 },
      { label: "Sea Green", count: 1 },
      { label: "Tan", count: 1 },
      { label: "Teal", count: 2 },
      { label: "Walnut & Beige", count: 1 },
    ],
  },
  {
    title: "Style",
    type: "checkbox",
    content: [
      { label: "Assortment", count: 8 },
      { label: "Best Seller", count: 11 },
    ],
  },
]

export function ProductFilters({
  selectedFilters,
  onFiltersChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<string[]>(["Price", "Availability", "Type Material"])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]))
  }

  const handleFilterChange = (sectionTitle: string, itemLabel: string, checked: boolean) => {
    const currentFilters = selectedFilters[sectionTitle] || []
    const newFilters = checked ? [...currentFilters, itemLabel] : currentFilters.filter((f) => f !== itemLabel)

    onFiltersChange({
      ...selectedFilters,
      [sectionTitle]: newFilters,
    })
  }

  const getFilteredProductCount = () => {
    // Calculate filtered count based on active filters
    return Object.values(selectedFilters).flat().length > 0
      ? Math.max(1, 35 - Object.values(selectedFilters).flat().length * 3)
      : 35
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="border border-gray-300 rounded-md p-3 mb-2 hover:bg-red-500 hover:text-white transition-all duration-300 group w-fit">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 group-hover:text-white" />
          <span className="font-serif font-semibold">Filter</span>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-gray-500">{getFilteredProductCount()} products</span>
      </div>

      <div className="space-y-4">
        {filterSections.map((section) => (
          <Collapsible
            key={section.title}
            open={openSections.includes(section.title)}
            onOpenChange={() => toggleSection(section.title)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium text-left">
                {section.title}
                {openSections.includes(section.title) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-3">
              {section.type === "range" && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    The highest price is ₹{section.content.max.toLocaleString()}
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={onPriceRangeChange}
                    max={section.content.max}
                    min={section.content.min}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">₹</label>
                      <div className="text-sm font-medium">{priceRange[0].toLocaleString()}</div>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">₹</label>
                      <div className="text-sm font-medium">{priceRange[1].toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}

              {section.type === "checkbox" && (
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {section.content.map((item: any) => (
                    <div key={item.label} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.label}
                        checked={(selectedFilters[section.title] || []).includes(item.label)}
                        onCheckedChange={(checked) => handleFilterChange(section.title, item.label, checked as boolean)}
                      />
                      <label htmlFor={item.label} className="text-sm flex-1 cursor-pointer">
                        {item.label}
                      </label>
                      <span className="text-xs text-gray-500">{item.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
