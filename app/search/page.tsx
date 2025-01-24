'use client'

import { useSearchParams } from 'next/navigation'
import EnhancedSearch from '@/components/EnhancedSearch';
import ReviewFilters from '@/components/reviews/ReviewFilters';

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchType = searchParams?.get('type') ?? 'dates'
  const validatedSearchType = (searchType === 'marketplace' || searchType === 'dates') ? searchType : 'dates' as const

  return <EnhancedSearch initialSearchType={validatedSearchType} />;
}

