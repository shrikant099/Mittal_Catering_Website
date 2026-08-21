export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const ALLOWED_IMAGE_ACCEPT = ".png,.jpg,.jpeg,.webp";
export const ALLOWED_IMAGE_MESSAGE =
  "Only PNG, JPG or WEBP images are allowed";

export function isAllowedImageType(file: File | null | undefined) {
  return !!file && ALLOWED_IMAGE_TYPES.includes(file.type);
}
