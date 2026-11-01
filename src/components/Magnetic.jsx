import useMagnetic from '../hooks/useMagnetic'

export default function Magnetic({ as: Tag = 'a', strength = 0.3, children, ...rest }) {
  const ref = useMagnetic(strength)
  return <Tag ref={ref} {...rest}>{children}</Tag>
}
