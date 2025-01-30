import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import type { SearchResult } from '@/types/search';

interface SearchResultsGridProps {
  results: SearchResult[];
  visibleResults: number;
  onLoadMore: () => void;
  onFavorite: (id: number) => void;
  onImageClick: (index: number) => void;
}

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-[16/9] bg-gray-200" />
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  </div>
);

export default function SearchResultsGrid({
  results,
  visibleResults,
  onLoadMore,
  onFavorite,
  onImageClick,
}: SearchResultsGridProps) {
  const router = useRouter();

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {results.slice(0, visibleResults).map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (!target.closest('button') && !target.closest('img')) {
                router.push(`/listing/${item.id}`);
              }
            }}
          >
            <div className="aspect-[16/9] relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="group-hover:scale-105 transition-transform duration-500 object-cover"
                onClick={() => onImageClick(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <button
                  className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
                  onClick={() => onFavorite(item.id)}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-black/30 rounded-full text-sm text-white backdrop-blur-sm">
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ${item.originalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {item.date}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {item.guestCapacity} guests
                </span>
              </div>
              <ul className="mt-3 space-y-1">
                {item.description.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {visibleResults < results.length && (
        <div className="mt-12 text-center">
          <button
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 inline-flex items-center gap-2"
            onClick={onLoadMore}
          >
            Show more listings
          </button>
        </div>
      )}
    </>
  );
}
