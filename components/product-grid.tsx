"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Magnific Velvet Sofa In Sea Green Color",
    brand: "HOMETOWN",
    price: 19900,
    originalPrice: 71200,
    image: "/teal-velvet-sofa-modern.png",
    hoverImage: "/sofaseagreen.webp",
    badge: "Store Exclusive",
  },
  {
    id: 2,
    name: "Miami Ottoman in Grey Colour",
    brand: "HOMETOWN",
    price: 12990,
    originalPrice: 79000,
    image: "/grey-fabric-round-ottoman.png",
    hoverImage: "/maimi.jpg",
    badge: "Store Exclusive",
  },
  {
    id: 3,
    name: "Miami 1 seater Chair in Grey Colour",
    brand: "HOMETOWN",
    price: 24900,
    originalPrice: 142000,
    image: "/grey-modern-armchair.png",
    hoverImage: "/grey-armchair-different-angle.png",
    badge: "Store Exclusive",
  },
  {
    id: 4,
    name: "Miami 4 Seater Sofa in Grey Colour",
    brand: "HOMETOWN",
    price: 65900,
    originalPrice: 351000,
    image: "/grey-modern-sectional.png",
    hoverImage: "/grey-sectional-sofa-side.png",
    badge: "Store Exclusive",
  },
  {
    id: 5,
    name: "Bradford Fabric Two Seater Sofa in Beige Colour",
    brand: "HOMETOWN",
    price: 29900,
    originalPrice: 97000,
    image: "/beige-classic-sofa.png",
    hoverImage: "/beige-sofa-alternate.png",
    badge: "Store Exclusive",
  },
  {
    id: 6,
    name: "Asher Fabric Sofa In Grey Color",
    brand: "HOMETOWN",
    price: 24999,
    originalPrice: 99900,
    image: "/grey-fabric-sofa-minimalist.png",
    hoverImage: "/grey-minimalist-sofa-side.png",
    badge: "Store Exclusive",
  },
  {
    id: 7,
    name: "Bellrose Velvet Fabric Sofa In Brown Color",
    brand: "HOMETOWN",
    price: 39999,
    originalPrice: 164900,
    image: "/luxury-brown-velvet-chesterfield.png",
    hoverImage: "/brown-velvet-chesterfield-angle.png",
    badge: "Store Exclusive",
  },
  {
    id: 8,
    name: "Comfort Plus Recliner Sofa in Beige",
    brand: "HOMETOWN",
    price: 45900,
    originalPrice: 89000,
    image: "/beige-leather-recliner-sofa.png",
    hoverImage: "/beige-recliner-sofa-reclined.png",
    badge: "Store Exclusive",
  },
  {
    id: 9,
    name: "Nordic Style 3 Seater Sofa in Light Grey",
    brand: "HOMETOWN",
    price: 32900,
    originalPrice: 78000,
    discount: "58% Off",
    image: "/light-grey-nordic-sofa.png",
    hoverImage: "/light-grey-nordic-sofa-side.png",
    badge: "Store Exclusive",
  },
  {
    id: 10,
    name: "Paddington Fabric Sofa In Brown Color",
    brand: "HOMETOWN",
    price: 14900,
    originalPrice: 36900,
    image: "/ssss.webp",
    hoverImage: "/sssshover.webp",
    badge: "Store Exclusive",
  },
]

interface ProductGridProps {
  searchQuery: string
  selectedFilters: Record<string, string[]>
  priceRange: number[]
  sortBy: string
  viewMode: "grid" | "list"
}

export function ProductGrid({ searchQuery, selectedFilters, priceRange, sortBy, viewMode }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Category filters
      for (const [category, filters] of Object.entries(selectedFilters)) {
        if (filters.length > 0) {
          // Simple matching logic - in real app this would be more sophisticated
          const productMatches = filters.some(
            (filter) =>
              product.name.toLowerCase().includes(filter.toLowerCase()) ||
              (category === "Color" && product.name.toLowerCase().includes(filter.toLowerCase())),
          )
          if (!productMatches) return false
        }
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "alphabetically-az":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "alphabetically-za":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "best-selling":
        filtered.sort((a, b) => b.discount.localeCompare(a.discount))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedFilters, priceRange, sortBy])

  const getGridClasses = () => {
    switch (viewMode) {
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      case "list":
        return "flex flex-col gap-6"
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    }
  }

  const getImageHeight = () => {
    switch (viewMode) {
      case "grid":
        return "h-64"
      case "list":
        return "h-48"
      default:
        return "h-64"
    }
  }

  return (
    <div className={getGridClasses()}>
      {filteredAndSortedProducts.map((product) => (
        <div
          key={product.id}
          className="group"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div
            className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
              <img
                src={hoveredProduct === product.id ? product.hoverImage : product.image || "/placeholder.svg"}
                alt={product.name}
                className={`w-full ${getImageHeight()} object-cover transition-all duration-200`}
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1">
                  {product.badge}
                </Badge>
              )}
              {product.discount && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1">
                  {product.discount}
                </Badge>
              )}
            </div>

            <div className={`p-4 space-y-2 ${viewMode === "list" ? "flex-1" : ""}`}>
              <h3
                className={`font-medium leading-tight text-gray-800 line-clamp-2 ${
                  viewMode === "list" ? "text-sm" : "text-base"
                }`}
              >
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">{product.brand}</p>

              <div className="flex items-center gap-2 pt-1">
                <span className={`font-bold text-gray-900 ${viewMode === "list" ? "text-lg" : "text-xl"}`}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
