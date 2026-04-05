import { memo } from 'react'

const Divider = memo(function Divider() {
  return <hr className="divider" aria-hidden />
})

export default Divider
