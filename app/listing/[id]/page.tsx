import MarketplaceListingDetail from "../../components/marketplace/MarketplaceListingDetail";
import ListingDetail from "../../components/ListingDetail";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // TODO: In production, this should check against your venue listings database
  // For now, we'll assume all listings in /listing/[id] are venue listings
  const isVenueListing = true;
  
  return isVenueListing ? (
    <ListingDetail params={params} />
  ) : (
    <MarketplaceListingDetail params={params} />
  );
}
