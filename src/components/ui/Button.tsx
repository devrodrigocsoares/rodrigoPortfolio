import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type CommonProps = {
  children: ReactNode
  variant?: 'default' | 'invert' | 'solid'
  icon?: ReactNode
  className?: string
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
  }

type ButtonProps = AsButton | AsAnchor

const variantClass: Record<NonNullable<CommonProps['variant']>, string> = {
  default: '',
  invert: 'btn-invert',
  solid: 'btn-solid',
}

export function Button(props: ButtonProps) {
  const { children, variant = 'default', icon, className = '' } = props
  const classes = `btn ${variantClass[variant]} ${className}`.trim()

  if (props.as === 'a') {
    const { as: _as, variant: _v, icon: _i, className: _c, children: _ch, ...rest } = props
    return (
      <a className={classes} {...rest}>
        {icon}
        {children}
      </a>
    )
  }

  const { as: _as, variant: _v, icon: _i, className: _c, children: _ch, ...rest } =
    props as AsButton
  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
    </button>
  )
}
