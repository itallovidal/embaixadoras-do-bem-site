export function scroll(id: string) {
  const section = document.getElementById(id)

  if (!section) {
    return
  }
  const sectionPosition = section.offsetTop

  window.scrollTo({
    top: sectionPosition,
    behavior: 'smooth',
  })
}
