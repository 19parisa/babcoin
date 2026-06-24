import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [profile, setProfile] = useState({ name: '', major: '', interests: [], photoUrl: null })
  const [registeredIds, setRegisteredIds] = useState(new Set())

  function saveProfile(data) {
    setProfile(prev => ({ ...prev, ...data }))
  }

  function register(eventId) {
    setRegisteredIds(prev => new Set([...prev, eventId]))
  }

  function unregister(eventId) {
    setRegisteredIds(prev => {
      const next = new Set(prev)
      next.delete(eventId)
      return next
    })
  }

  return (
    <AppContext.Provider value={{ profile, saveProfile, registeredIds, register, unregister }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
