import MarketplaceListingDetail from "@/components/marketplace/MarketplaceListingDetail";

export default function MarketplaceListingDetailPage({ params }: { params: { id: string } }) {
  return <MarketplaceListingDetail params={params} />;
}
