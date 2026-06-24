import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNav } from '../context/NavContext'

/* ── Figma asset URLs ── */
const DEFAULT_AVATAR = 'https://www.figma.com/api/mcp/asset/5574e9e1-791b-424a-b860-d7ffee15541e'

// Real event photos — from Figma Section 3 (node 5018-3464)
const COMP6_PHOTO = 'https://www.figma.com/api/mcp/asset/80dc1ee8-461c-4794-80d0-0a93f093c814' // B@B Demo Day
const COMP7_PHOTO = 'https://www.figma.com/api/mcp/asset/ff99de7a-75ed-4c16-b0ae-adb952b20ee3' // Design Work Session
const COMP8_PHOTO = 'https://www.figma.com/api/mcp/asset/26f2144c-a761-484a-a821-6e6c4470b725' // Pre Retreat Meeting

const NFT_GOLD_BAR = 'https://www.figma.com/api/mcp/asset/0f70a24f-4c9b-4c49-8b0b-87f55339ef89'

// All Events list thumbnails
const THUMB_CC3    = 'https://www.figma.com/api/mcp/asset/1e6e2a00-45e6-425e-af9f-00f7e2b8ccef'
const THUMB_CC2    = 'https://www.figma.com/api/mcp/asset/879cef9e-36c8-4ea4-8c2b-c1389033ad1d'
const THUMB_CC1    = 'https://www.figma.com/api/mcp/asset/a3fe23f7-4c4c-4378-894d-b63dbdd76946'
const THUMB_CALDAY = 'https://www.figma.com/api/mcp/asset/6679871a-15e7-4fb2-9069-857cb27f618e'
const THUMB_TEMPLE = 'https://www.figma.com/api/mcp/asset/2be08dd2-cf9d-4e96-9f60-08680ba92bcc'
const THUMB_K1     = 'https://www.figma.com/api/mcp/asset/dc67f8fe-aa28-46ff-885e-0008bdc293b7'
const THUMB_BRUNCH = 'https://www.figma.com/api/mcp/asset/6a56c8a5-9e1a-4cce-8b48-6ca5238251b1'

// Organiser avatars
const ORG_TVISHA  = 'https://www.figma.com/api/mcp/asset/ee8dc4f3-43ff-4017-9a94-defbc153289a'
const ORG_ARUSHI  = 'https://www.figma.com/api/mcp/asset/95f6bf62-b5f6-42f1-a34e-994c6d363cd8'

const UPCOMING = [
  { id: 101, category: 'Clubcensus', label: 'B@B Demo Day!',       date: 'May 1st, 8-10 PM',    photo: COMP6_PHOTO },
  { id: 102, category: 'Design Edu', label: 'Design Work Session', date: 'April 29th, 3-5 PM',  photo: COMP7_PHOTO, rotated: true },
  { id: 103, category: 'Design Edu', label: 'Pre Retreat Meeting', date: 'April 25th, 2-4 PM',  photo: COMP8_PHOTO },
]

const ALL_EVENTS = [
  { id: 1, title: 'Club Census 3',    date: '02/14/2025', category: 'Clubcensus', img: THUMB_CC3    },
  { id: 2, title: 'Club Census 2',    date: '03/09/2025', category: 'Clubcensus', img: THUMB_CC2    },
  { id: 3, title: 'Club Census 1',    date: '03/19/2025', category: 'Clubcensus', img: THUMB_CC1    },
  { id: 4, title: 'Cal Day',          date: '05/02/2025', category: 'Socials',    img: THUMB_CALDAY },
  { id: 5, title: 'Temple Cross Club',date: '04/28/2025', category: 'Socials',    img: THUMB_TEMPLE },
  { id: 6, title: 'K1 Speed',         date: '04/17/2025', category: 'Socials',    img: THUMB_K1     },
  { id: 7, title: 'Bottomless Brunch',date: '04/11/2025', category: 'Socials',    img: THUMB_BRUNCH },
]

const FILTERS = ['Recent', 'Clubcensus', 'Design Edu', 'Socials']


/* ── Upcoming NFT card — matches profile page NFT styling ── */
function UpcomingCard({ event }) {
  const { registeredIds, register, unregister } = useApp()
  const isReg = registeredIds.has(event.id)
  const [popped, setPopped] = useState(false)

  function handleToggle() {
    setPopped(true)
    setTimeout(() => setPopped(false), 400)
    isReg ? unregister(event.id) : register(event.id)
  }

  return (
    <motion.div
      className="relative shrink-0 w-[205px] h-[209px] rounded-[14px] overflow-hidden cursor-pointer"
      style={{ border: '0.5px solid rgba(255,255,255,0.4)' }}
      animate={popped ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Photo — 30% opacity, rotate if flagged */}
      <img
        src={event.photo}
        alt={event.label}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.3,
          ...(event.rotated && { transform: 'rotate(90deg) scale(1.45)' }),
        }}
      />

      {/* Top gold strip */}
      <div className="absolute top-0 inset-x-0 h-[14px]" style={{ zIndex: 2 }}>
        <img src={NFT_GOLD_BAR} alt="" className="w-full h-full object-cover" />
      </div>
      {/* Bottom gold strip (flipped) */}
      <div className="absolute bottom-0 inset-x-0 h-[14px]" style={{ zIndex: 2, transform: 'scaleY(-1)' }}>
        <img src={NFT_GOLD_BAR} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Bottom gradient scrim for text legibility */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.85) 100%)', zIndex: 3 }} />

      {/* Event title */}
      <p className="absolute left-[16px] right-[14px] text-white font-display font-semibold text-[17px] leading-snug" style={{ bottom: 79, zIndex: 4 }}>
        {event.label}
      </p>

      {/* Date */}
      <p className="absolute left-[16px] text-white/70 font-display text-[11px]" style={{ bottom: 58, zIndex: 4 }}>
        {event.date}
      </p>

      {/* Pre-Mint NFT / Registered button */}
      <motion.button
        onClick={handleToggle}
        className="absolute left-[16px] rounded-[7px] px-3 py-[4px] text-[11.6px] font-display"
        style={{
          bottom: 24,
          zIndex: 4,
          background: isReg
            ? 'linear-gradient(90deg, #4ade80, #22c55e)'
            : 'linear-gradient(89.98deg, #f6e8cd 28.59%, #fbe2b1 100%)',
          color: '#111010',
          transition: 'background 0.35s ease',
        }}
        whileTap={{ scale: 0.93 }}
      >
        {isReg ? 'Registered ✓' : 'Pre-Mint NFT'}
      </motion.button>
    </motion.div>
  )
}

/* ── Standard event list row ── */
function EventRow({ event }) {
  const { registeredIds, register, unregister } = useApp()
  const isReg = registeredIds.has(event.id)
  const [popped, setPopped] = useState(false)

  function handleToggle() {
    setPopped(true)
    setTimeout(() => setPopped(false), 400)
    isReg ? unregister(event.id) : register(event.id)
  }

  return (
    <motion.div
      className="flex items-center gap-3 py-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}
      animate={popped ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-[68px] h-[68px] rounded-[6px] overflow-hidden shrink-0 opacity-75">
        <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-display text-[18px] font-medium leading-tight truncate">{event.title}</p>
        <p className="text-white/50 font-body text-[11px] mt-0.5">{event.date}</p>
        <motion.button
          onClick={handleToggle}
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

export default function Events() {
  const { dirRef, go } = useNav()
  const { profile } = useApp()
  const [activeFilter, setActiveFilter] = useState('Recent')

  const x = dirRef.current * 390
  const pageVariants = {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -x, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  }

  const filteredEvents = activeFilter === 'Recent'
    ? ALL_EVENTS
    : ALL_EVENTS.filter(ev => ev.category === activeFilter)

  const grouped = filteredEvents.reduce((acc, ev) => {
    if (!acc[ev.category]) acc[ev.category] = []
    acc[ev.category].push(ev)
    return acc
  }, {})

  return (
    <motion.div
      className="relative w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar"
      style={{ background: '#111010' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Decorative light streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-[-60px] top-[-30px] w-[280px] h-[280px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(254,169,51,0.35) 0%, transparent 65%)' }}
        />
      </div>

      {/* Status bar */}
      <div className="px-6 pt-4 pb-0 flex justify-between items-center">
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

      {/* Header: avatar + title + back pill */}
      <div className="px-[29px] pt-4 pb-2 flex items-center gap-3">
        <img
          src={profile.photoUrl || DEFAULT_AVATAR}
          alt="avatar"
          className="w-[52px] h-[52px] rounded-full object-cover cursor-pointer shrink-0"
          onClick={() => go('/profile', -1)}
        />
        <div className="flex-1">
          <h1 className="text-white text-[26px] font-display font-semibold leading-tight">
            Discover<br />Events
          </h1>
        </div>
        <motion.button
          onClick={() => go('/profile', -1)}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] text-[12px] font-display"
          style={{
            color: 'rgba(255,255,255,0.65)',
            background: 'linear-gradient(to bottom, rgba(217,217,217,0.18) 0%, rgba(255,249,249,0.18) 100%)',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 10L3.5 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Profile
        </motion.button>
      </div>

      {/* ── Tab bar ── */}
      <div className="px-[29px] mt-2">
        <div className="flex gap-6">
          {['Events', 'My Events'].map(tab => {
            const active = tab === 'Events'
            return (
              <button
                key={tab}
                onClick={() => tab === 'My Events' && go('/my-events', 0)}
                className="relative pb-2 text-[14px] font-display font-medium"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}
              >
                {tab}
                {active && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: '#fea933' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
        <div className="h-px bg-white/10 -mt-px" />
      </div>

      {/* ── Upcoming section ── */}
      <div className="mt-5 px-[29px]">
        <p className="text-white text-[23px] font-display font-semibold mb-3">Upcoming</p>
      </div>

      {/* Horizontal Component-6 style cards */}
      <div className="flex gap-3 pl-[29px] pr-4 overflow-x-auto hide-scrollbar pb-2">
        {UPCOMING.map(ev => (
          <UpcomingCard key={ev.id} event={ev} />
        ))}
      </div>

      {/* ── All Events section ── */}
      <div className="px-[29px] mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white text-[23px] font-display font-semibold">All Events</p>
          <motion.button
            onClick={() => go('/all-events', 1)}
            className="text-white/60 text-[13px] font-display flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All →
          </motion.button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-2">
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

        {/* Grouped event rows */}
        {Object.entries(grouped).map(([cat, events]) => (
          <div key={cat} className="mb-4">
            <p className="text-white text-[22px] font-body font-medium mt-3 mb-0">{cat}</p>
            {events.map(ev => <EventRow key={ev.id} event={ev} />)}
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="h-10" />
      <div className="sticky bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-40" />
      </div>
    </motion.div>
  )
}
