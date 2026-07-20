import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { galleryCaption } from "@/lib/content/home-content";
import Image from "next/image";

export function GallerySection() {

 const galleryImages = [
  {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-3.jpeg",
    title: "Gallery 1",
  },
  {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-1.jpeg",
    title: "Gallery 2",
  },
  {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-2.jpeg",
    title: "Gallery 3",
  }, {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-24-at-12.57.19-AM.jpeg",
    title: "Gallery 3",
  }, {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-24-at-12.57.09-AM.jpeg",
    title: "Gallery 3",
  }, {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/03/exhibiting_227681290_0-min.jpg",
    title: "Gallery 3",
  }, {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277527150_1022182995341916_4773007713539910118_n-1.jpg",
    title: "Gallery 3",
  }, {
    image: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277756487_1022183295341886_6728238397737750234_n.jpg",
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
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
