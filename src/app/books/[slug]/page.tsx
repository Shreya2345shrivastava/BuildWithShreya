import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { books } from "@/data/books";

import {
  BookBenefits,
  BookDetails,
  BookHeroDetail,
  BookPreviewGallery,
  BookPurchase,
  RelatedBooks,
  BookTestimonials,
  BookAuthor,
  BookFaq,
} from "@/components/books";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const book = books.find(
    (item) => item.slug === slug
  );

  if (!book) {
    return {
      title: "Book Not Found | BuildWithShreya",
    };
  }

  return {
    title: `${book.title} | BuildWithShreya`,
    description: book.description,

    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.cover],
    },

    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.description,
      images: [book.cover],
    },
  };
}

export default async function BookDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const book = books.find(
    (item) => item.slug === slug
  );

  if (!book) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    image: book.cover,
    offers: {
      "@type": "Offer",
      price: book.price.replace("₹", ""),
      priceCurrency: "INR",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Premium Hero */}
      <BookHeroDetail
            title={book.title}
            description={book.description}
            price={book.price}
            category={book.category}
            cover={book.cover}
            gumroadUrl={book.gumroadUrl}
            />

      {/* Details */}
      <BookDetails
        pages={book.pages}
        format={book.format}
        category={book.category}
      />

      {/* Benefits */}
      <BookBenefits
        benefits={book.benefits}
      />

      {/* Preview Gallery */}
      <BookPreviewGallery
        pages={book.previewPages}
      />

      {/* Purchase Section */}
      <BookPurchase
        price={book.price}
        gumroadUrl={book.gumroadUrl}
        kindleUrl={book.kindleUrl}
        includes={book.includes}
      />
        <BookTestimonials />

        <BookFaq />

        <BookAuthor />

        <RelatedBooks
        currentSlug={book.slug}
        />
    </main>
  );
}