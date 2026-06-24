import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { NavProvider } from './context/NavContext'
import Onboarding from './pages/Onboarding'
import Profile from './pages/Profile'
import Events from './pages/Events'
import AllEvents from './pages/AllEvents'
import MyEvents from './pages/MyEvents'

export default function App() {
  const location = useLocation()

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #1e1e22 0%, #0a0a0c 100%)',
      }}
    >
      {/* ── iPhone 14 Pro body ── */}
      <div
        className="relative"
        style={{
          width: 416,
          borderRadius: 54,
          background: 'linear-gradient(160deg, #3a3a3c 0%, #26262a 35%, #1c1c1e 65%, #111114 100%)',
          boxShadow: [
            '0 80px 160px rgba(0,0,0,0.9)',
            '0 20px 60px rgba(0,0,0,0.6)',
            '0 0 0 1px rgba(255,255,255,0.11)',
            'inset 0 1px 0 rgba(255,255,255,0.2)',
            'inset 0 -1px 0 rgba(0,0,0,0.6)',
          ].join(', '),
          padding: '16px 13px 20px',
        }}
      >
        {/* Screen */}
        <div className="relative w-[390px] h-[844px] overflow-hidden bg-black" style={{ borderRadius: 44 }}>
          <NavProvider>
            <LayoutGroup>
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Onboarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/all-events" element={<AllEvents />} />
                  <Route path="/my-events" element={<MyEvents />} />
                </Routes>
              </AnimatePresence>
            </LayoutGroup>
          </NavProvider>

          {/* Dynamic Island — overlays status bar center */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 34,
              borderRadius: 20,
              background: '#000',
              zIndex: 999,
            }}
          />
        </div>

        {/* ── Side hardware buttons ── */}

        {/* Silent switch */}
        <div style={{
          position: 'absolute', left: -4, top: 148,
          width: 4, height: 32, borderRadius: '3px 0 0 3px',
          background: 'linear-gradient(90deg, #111114, #2a2a2c)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />
        {/* Volume up */}
        <div style={{
          position: 'absolute', left: -4, top: 200,
          width: 4, height: 64, borderRadius: '3px 0 0 3px',
          background: 'linear-gradient(90deg, #111114, #2a2a2c)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />
        {/* Volume down */}
        <div style={{
          position: 'absolute', left: -4, top: 280,
          width: 4, height: 64, borderRadius: '3px 0 0 3px',
          background: 'linear-gradient(90deg, #111114, #2a2a2c)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />

        {/* Power button */}
        <div style={{
          position: 'absolute', right: -4, top: 210,
          width: 4, height: 90, borderRadius: '0 3px 3px 0',
          background: 'linear-gradient(270deg, #111114, #2a2a2c)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />
      </div>
    </div>
  )
}
