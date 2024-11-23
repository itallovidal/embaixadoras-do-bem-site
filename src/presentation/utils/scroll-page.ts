export function scroll(id: string) {
  const section = document.querySelector(id)
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
