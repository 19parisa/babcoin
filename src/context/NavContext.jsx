import { createContext, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavContext = createContext(null)

export function NavProvider({ children }) {
  const navigate = useNavigate()
  const dirRef = useRef(1)

  function go(path, dir = 1) {
    dirRef.current = dir
    navigate(path)
  }

  return <NavContext.Provider value={{ dirRef, go }}>{children}</NavContext.Provider>
}

export function useNav() {
  return useContext(NavContext)
}
