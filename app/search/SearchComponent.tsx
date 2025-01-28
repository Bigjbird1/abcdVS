// app/search/SearchComponent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import EnhancedSearch from "@/components/EnhancedSearch";

export default function SearchComponent() {
  // Use the useSearchParams hook to read query parameters
  const searchParams = useSearchParams();

  // Get the 'type' query parameter, defaulting to 'dates' if not provided
  const searchType = searchParams?.get("type") ?? "dates";

  // Validate the searchType to ensure it's either 'marketplace' or 'dates'
  const validatedSearchType =
    searchType === "marketplace" || searchType === "dates"
      ? searchType
      : "dates";

  // Pass the validated searchType to the EnhancedSearch component
  return <EnhancedSearch initialSearchType={validatedSearchType} />;
}
