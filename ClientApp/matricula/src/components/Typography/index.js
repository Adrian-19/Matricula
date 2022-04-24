import './index.css'

const VARIANT_MAP = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  heading: 'h2',
  subheading: 'h3',
  span: 'span',
  p: 'p'
}

function TextEllipsis({ lineClamp = 1, children }) {
  return (
    <div className="textEllipsis" style={{ WebkitLineClamp: lineClamp }}>
      {children}
    </div>
  )
}

function Typography({
  variant = 'span',
  type = 'primary',
  noSelectable = false,
  ellipsis = false,
  block = null,
  align = 'left',
  weight = null,
  lineClamp = '1',
  margin = '0',
  color = null,
  className = '',
  lineHeight = "normal",
  size = null,
  children,
  style = {},
  ...props
}) {

  const ComponentProps = {
    className: `${className}
      typography 
      typography--${type} 
      ${((align !== 'left') || block) ? 'typography--block' : null} 
      typography--type-${type} 
      typography--variant-${variant}
    `,
    style: {
      display: block === null ? null : block ? 'block' : 'inline',
      userSelect: noSelectable ? 'none' : null,
      margin,
      fontWeight: weight,
      color,
      textAlign: align,
      lineHeight,
      fontSize: size,
      ...style
    }
  }
  const Component = VARIANT_MAP[variant]
  
  return ellipsis ? (
    <TextEllipsis lineClamp={lineClamp}>
      <Component {...props} {...ComponentProps} >
        {children}
      </Component>
    </TextEllipsis>
  ) : (
    <Component {...props} {...ComponentProps}>{children}</Component>
  )
}

export default Typography