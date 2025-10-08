export interface CarouselItem {
  image: any; // Consider using a more specific type based on your image assets
  title: string;
  desc: string;
}

export interface CarouselRenderItemProps {
  item: CarouselItem;
  index: number;
}

export interface ImageCarouselProps {
  autoPlayInterval?: number;
  scrollAnimationDuration?: number;
}
