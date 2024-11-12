export function formatPostDescription(text: string): string {
  const sub = text.substring(0, 250)
  const textWithoutH1 = sub.replaceAll('#', '')
  const textWithoutH2 = textWithoutH1.replaceAll('##', '')
  const textWithoutBold = textWithoutH2.replaceAll('**', ' ')

  console.log('antes->')
  console.log(sub)
  console.log('depois->')
  console.log(textWithoutBold)

  return textWithoutBold
}
