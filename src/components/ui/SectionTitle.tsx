interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
}: SectionTitleProps) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-ink'
  const descColor = tone === 'dark' ? 'text-white/70' : 'text-muted'
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${titleColor}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-relaxed ${descColor}`}>{description}</p>}
    </div>
  )
}
