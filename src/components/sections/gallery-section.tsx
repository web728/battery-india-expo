import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { galleryCaption } from "@/lib/content/home-content";
import Image from "next/image";

export function GallerySection() {

 const galleryImages = [
  {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-36.jpg",
    title: "Gallery 1",
  },
  {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-35.jpg",
    title: "Gallery 2",
  },
  {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
    title: "Gallery 3",
  }, {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-33.jpg",
    title: "Gallery 3",
  }, {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-45.jpg",
    title: "Gallery 3",
  }, {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-44.jpg",
    title: "Gallery 3",
  }, {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-39.jpg",
    title: "Gallery 3",
  }, {
    image: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-4.jpg",
    title: "Gallery 3",
  },
];


  return (
    <section className="bg-grey-light py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="Previous Show Gallery" align="center" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
 {galleryImages.map((item, i) => (
  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover"
    />
  </div>
))}
</div>
        <div className="mt-8 flex justify-center">
          <Button href="/media/gallery" variant="secondary">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
