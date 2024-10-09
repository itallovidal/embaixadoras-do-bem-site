import { v4 as uuidv4 } from 'uuid'

export function generatePreviewImages(
  files: FileList | null,
): ISelectedImage[] {
  const images: ISelectedImage[] = []

  if (!files) return images

  for (let i = 0; i < files.length; i++) {
    if (!files[i]) return images

    images.push({
      file: files[i],
      id: uuidv4(),
      src: URL.createObjectURL(files![i]),
    })
  }

  return images
}
