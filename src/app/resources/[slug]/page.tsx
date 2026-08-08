import { notFound } from "next/navigation";
import { resources } from "@/data/resources";

import {
  ResourceHeroDetail,
  ResourceDetails,
  ResourceBenefits,
} from "@/components/resources";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export default async function ResourceDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const resource = resources.find(
    (item) => item.slug === slug
  );

  if (!resource) {
    notFound();
  }

  return (
    <main>
      <ResourceHeroDetail
        title={resource.title}
        description={resource.description}
        price={resource.price}
        type={resource.type}
      />

      <ResourceDetails
        pages={resource.pages}
        format={resource.format}
        type={resource.type}
      />

      <ResourceBenefits
        benefits={resource.benefits}
      />
    </main>
  );
}