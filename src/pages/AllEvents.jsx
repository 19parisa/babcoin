import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNav } from '../context/NavContext'

const GLOW = 'https://www.figma.com/api/mcp/asset/a88bbcc7-9c10-4c41-aee2-80735bb50bd4'

const THUMB_CC3    = 'https://www.figma.com/api/mcp/asset/1e6e2a00-45e6-425e-af9f-00f7e2b8ccef'
const THUMB_CC2    = 'https://www.figma.com/api/mcp/asset/879cef9e-36c8-4ea4-8c2b-c1389033ad1d'
const THUMB_CC1    = 'https://www.figma.com/api/mcp/asset/a3fe23f7-4c4c-4378-894d-b63dbdd76946'
const THUMB_CALDAY = 'https://www.figma.com/api/mcp/asset/6679871a-15e7-4fb2-9069-857cb27f618e'
const THUMB_TEMPLE = 'https://www.figma.com/api/mcp/asset/2be08dd2-cf9d-4e96-9f60-08680ba92bcc'
const THUMB_K1     = 'https://www.figma.com/api/mcp/asset/dc67f8fe-aa28-46ff-885e-0008bdc293b7'
const THUMB_BRUNCH = 'https://www.figma.com/api/mcp/asset/6a56c8a5-9e1a-4cce-8b48-6ca5238251b1'

const EVENT_GROUPS = [
  {
    category: 'Club Census',
    events: [
      { id: 1, title: 'Club Census 3', date: '02/14/2025', img: THUMB_CC3 },
      { id: 2, title: 'Club Census 2', date: '03/09/2025', img: THUMB_CC2 },
      { id: 3, title: 'Club Census 1', date: '03/19/2025', img: THUMB_CC1 },
    ],
  },
  {
    category: 'Socials',
    events: [
      { id: 4, title: 'Cal Day',           date: '05/02/2025', img: THUMB_CALDAY },
      { id: 5, title: 'Temple Cross Club', date: '04/28/2025', img: THUMB_TEMPLE },
      { id: 6, title: 'K1 Speed',          date: '04/17/2025', img: THUMB_K1    },
      { id: 7, title: 'Bottomless Brunch', date: '04/11/2025', img: THUMB_BRUNCH },
    ],
  },
]

const FILTERS = ['Recent', 'Clubcensus', 'Design Edu', 'Socials']


function EventRow({ event }) {
  const { registeredIds, register, unregister } = useApp()
  const isReg = registeredIds.has(event.id)
  const [popped, setPopped] = useState(false)

  function handleRegister() {
    setPopped(true)
    setTimeout(() => setPopped(false), 400)
    isReg ? unregister(event.id) : register(event.id)
  }

  return (
    <motion.div
      className="flex items-center gap-3 py-[18px]"
      style={{ borderTop: '1.24px solid rgba(255,255,255,0.18)' }}
      animate={popped ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="w-[68px] h-[68px] rounded-[6px] overflow-hidden shrink-0 opacity-75">
        <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-display text-[20px] font-medium leading-tight truncate">
          {event.title}
        </p>
        <p className="text-white/60 font-body text-[12px] mt-0.5">{event.date}</p>

        {/* Register */}
        <motion.button
          onClick={handleRegister}
          className="mt-1.5 px-3 py-0.5 rounded-[10px] text-[11px] font-display"
          style={{
            background: isReg ? 'rgba(34,197,94,0.18)' : 'rgba(254,169,51,0.12)',
            color: isReg ? '#4ade80' : '#fea933',
            border: `1px solid ${isReg ? 'rgba(74,222,128,0.35)' : 'rgba(254,169,51,0.35)'}`,
            transition: 'all 0.3s ease',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
        >
          {isReg ? 'Unregister' : 'Register'}
        </motion.button>
      </div>

    </motion.div>
  )
}

const FILTER_MAP = { Clubcensus: 'Club Census', Socials: 'Socials' }

export default function AllEvents() {
  const { dirRef, go } = useNav()
  const [activeFilter, setActiveFilter] = useState('Recent')

  const x = dirRef.current * 390
  const pageVariants = {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -x, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  }

  const visibleGroups = activeFilter === 'Recent'
    ? EVENT_GROUPS
    : EVENT_GROUPS.filter(g => g.category === FILTER_MAP[activeFilter])

  return (
    <motion.div
      className="relative w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ambient glow — matches Admin_1 / All Events frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-[-400px] top-[-130px] w-[1061px] h-[1072px]"
          style={{
            background: 'radial-gradient(ellipse 55% 45% at 63% 42%, rgba(160,95,5,0.32) 0%, rgba(80,40,0,0.15) 45%, transparent 70%)',
            transform: 'rotate(-37.5deg)',
          }}
        />
      </div>

      {/* Status bar */}
      <div className="px-6 pt-5 pb-0 flex justify-between items-center">
        <span className="text-white text-[15px] font-semibold font-display">9:41</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
            <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
            <rect x="5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
            <rect x="10" y="0.5" width="3" height="11.5" rx="1" opacity="0.8"/>
            <rect x="15" y="0" width="3" height="12" rx="1"/>
          </svg>
          <div className="flex items-center">
            <div className="w-[22px] h-[11px] rounded-[3px] border border-white/60 p-[1px]">
              <div className="w-full h-full bg-white rounded-[2px]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Header row: title + Discover Events pill */}
      <div className="px-[26px] pt-5 flex items-start justify-between">
        <h1 className="text-white text-[45px] font-display font-semibold leading-tight">
          All Events
        </h1>
        <motion.button
          onClick={() => go('/events', -1)}
          className="flex items-center px-3 py-1.5 rounded-[10px] text-white text-[14px] font-display mt-3"
          style={{
            background: 'linear-gradient(to bottom, rgba(217,217,217,0.5) 28.85%, rgba(255,249,249,0.5) 100%)',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          ← Discover
        </motion.button>
      </div>

      {/* Filter chips */}
      <div className="px-[26px] mt-3 mb-1">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {FILTERS.map(f => {
            const active = activeFilter === f
            return (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="shrink-0 px-4 h-[30px] rounded-[13px] text-[11.6px] font-display whitespace-nowrap"
                style={{
                  background: active ? '#f6e8cd' : 'transparent',
                  color: active ? '#111010' : '#f6e8cd',
                  border: active ? 'none' : '1px solid rgba(246,232,205,0.6)',
                  transition: 'all 0.2s ease',
                }}
                whileTap={{ scale: 0.94 }}
              >
                {f}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Grouped event list */}
      <div className="px-[26px] mt-4 pb-12">
        {visibleGroups.map(group => (
          <div key={group.category} className="mb-6">
            <p className="text-white text-[25px] font-body font-medium mb-0">{group.category}</p>
            {group.events.map(ev => (
              <EventRow key={ev.id} event={ev} />
            ))}
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="sticky bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-40" />
      </div>
    </motion.div>
  )
}
