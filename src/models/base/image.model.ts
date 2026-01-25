export interface Images {
  jpg: ImagesVariant;
  webp?: ImagesVariant;
}

export interface ImagesVariant {
  image_url: string | null;
  small_image_url?: string | null;
  medium_image_url?: string | null;
  large_image_url?: string | null;
  maximum_image_url?: string | null;
}
