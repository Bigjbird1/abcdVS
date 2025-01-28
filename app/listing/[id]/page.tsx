import MarketplaceListingDetail from "../../components/marketplace/MarketplaceListingDetail";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  return <MarketplaceListingDetail params={params} />;
}
