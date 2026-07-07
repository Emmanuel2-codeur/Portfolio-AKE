import { useState, useEffect } from 'react'

export default function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY >= 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
      className={`fixed right-6 z-50 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-accent to-blue-400 rounded-2xl text-white shadow-lg shadow-blue-400/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${show ? 'bottom-6 opacity-100' : '-bottom-20 opacity-0'}`}>
      <i className="bx bx-up-arrow-alt text-2xl" />
    </button>
  )
}
