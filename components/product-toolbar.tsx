"use client"

import { Grid3X3, List, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductToolbarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  compareMode: boolean
  onCompareModeChange: (enabled: boolean) => void
}

export function ProductToolbar({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  compareMode,
  onCompareModeChange,
}: ProductToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Compare:</span>
          <Button variant="ghost" size="sm" onClick={() => onCompareModeChange(!compareMode)} className="p-0 h-auto">
            {compareMode ? (
              <ToggleRight className="h-5 w-5 text-cyan-600" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="best-selling">Best selling</SelectItem>
              <SelectItem value="alphabetically-az">Alphabetically, A-Z</SelectItem>
              <SelectItem value="alphabetically-za">Alphabetically, Z-A</SelectItem>
              <SelectItem value="price-low-high">Price, low to high</SelectItem>
              <SelectItem value="price-high-low">Price, high to low</SelectItem>
              <SelectItem value="date-old-new">Date, old to new</SelectItem>
              <SelectItem value="date-new-old">Date, new to old</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">View as:</span>
          <div className="flex border border-gray-200 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={viewMode === "grid" ? "bg-cyan-600 text-white" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={viewMode === "list" ? "bg-cyan-600 text-white" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
