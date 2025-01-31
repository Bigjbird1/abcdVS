import MarketplaceListingDetail from "../../components/marketplace/MarketplaceListingDetail";
import ListingDetail from "../../components/ListingDetail";

import { redirect } from 'next/navigation';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // Check if the referrer is from marketplace
  const isMarketplaceListing = params.id.startsWith('mkt-');
  
  if (isMarketplaceListing) {
    // If it's a marketplace listing, redirect to the marketplace detail page
    redirect(`/marketplace/listing/${params.id}`);
  }

  // If it's not a marketplace listing, show the venue listing detail
  return <ListingDetail params={params} />;
}
