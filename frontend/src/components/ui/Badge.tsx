type BadgeProps = {
  category: string
}

type CategoryStyle = {
  bg: string
  text: string
}

const categoryStyles: Record<string, CategoryStyle> = {
  hackathon: { bg: '#EEF2FF', text: '#3730A3' },
  atelier: { bg: '#ECFDF5', text: '#065F46' },
  conference: { bg: '#FFF7ED', text: '#9A3412' },
  seminaire: { bg: '#FAF5FF', text: '#6B21A8' },
  culturel: { bg: '#FFF1F2', text: '#9F1239' },
  sport: { bg: '#FFFBEB', text: '#92400E' },
}

const defaultStyle: CategoryStyle = {
  bg: '#F4F3F0',
  text: '#64748B',
}

const normalizeCategory = (category: string): string =>
  category
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

function Badge({ category }: BadgeProps) {
  const style = categoryStyles[normalizeCategory(category)] ?? defaultStyle

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {category}
    </span>
  )
}

export default Badge
