import { v4 as uuidv4 } from 'uuid'

export function generatePreviewImages(
  files: FileList | null,
): ISelectedImages[] {
  const images: ISelectedImages[] = []

  if (!files) return images

  for (let i = 0; i < files.length; i++) {
    if (!files[i]) return images

    images.push({
      id: uuidv4(),
      src: URL.createObjectURL(files![i]),
      name: files![i].name,
    })
  }

  return images
}
