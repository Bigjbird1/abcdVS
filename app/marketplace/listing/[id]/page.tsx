import MarketplaceListingDetail from "@/components/marketplace/MarketplaceListingDetail";
import { Metadata } from "next";

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Listing ${params.id}`,
  }
}

export default async function MarketplaceListingDetailPage({ params }: PageProps) {
  return <MarketplaceListingDetail params={params} />;
}
