// app/search/page.tsx
'use client';

import { Suspense } from 'react';
import SearchComponent from './SearchComponent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
