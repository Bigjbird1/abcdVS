import MarketplaceListingDetail from "../../components/marketplace/MarketplaceListingDetail";
import ListingDetail from "../../components/ListingDetail";
import { redirect } from 'next/navigation';

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ListingDetailPage({ params }: PageProps) {
  // Check if the referrer is from marketplace
  const isMarketplaceListing = params.id.startsWith('mkt-');
  
  if (isMarketplaceListing) {
    // If it's a marketplace listing, redirect to the marketplace detail page
    redirect(`/marketplace/listing/${params.id}`);
  }

  // If it's not a marketplace listing, show the venue listing detail
  return <ListingDetail params={params} />;
}
