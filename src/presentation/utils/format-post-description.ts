export function formatPostDescription(text: string): string {
  const sub = text.substring(0, 250)
  const textWithoutH1 = sub.replaceAll('#', '')
  const textWithoutH2 = textWithoutH1.replaceAll('##', '')
  const textWithoutBold = textWithoutH2.replaceAll('**', ' ')

  return textWithoutBold
}
