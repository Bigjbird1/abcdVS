'use client'

import { useSearchParams } from 'next/navigation'
import EnhancedSearch from '../components/EnhancedSearch'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchType = searchParams.get('type') || 'dates'

  return <EnhancedSearch initialSearchType={searchType} />;
}

