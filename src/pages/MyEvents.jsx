import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNav } from '../context/NavContext'

const DEFAULT_AVATAR = 'https://www.figma.com/api/mcp/asset/5574e9e1-791b-424a-b860-d7ffee15541e'

const THUMB_CC3 = 'https://www.figma.com/api/mcp/asset/1e6e2a00-45e6-425e-af9f-00f7e2b8ccef'
const THUMB_CC2 = 'https://www.figma.com/api/mcp/asset/879cef9e-36c8-4ea4-8c2b-c1389033ad1d'
const THUMB_CC1 = 'https://www.figma.com/api/mcp/asset/a3fe23f7-4c4c-4378-894d-b63dbdd76946'
const THUMB_CALDAY = 'https://www.figma.com/api/mcp/asset/6679871a-15e7-4fb2-9069-857cb27f618e'
const THUMB_TEMPLE = 'https://www.figma.com/api/mcp/asset/2be08dd2-cf9d-4e96-9f60-08680ba92bcc'
const THUMB_K1 = 'https://www.figma.com/api/mcp/asset/dc67f8fe-aa28-46ff-885e-0008bdc293b7'
const THUMB_BRUNCH = 'https://www.figma.com/api/mcp/asset/6a56c8a5-9e1a-4cce-8b48-6ca5238251b1'
const CARD_IMG_1 = 'https://www.figma.com/api/mcp/asset/3d8e6ef5-94c4-4156-8f63-bcf9f6cade19'
const CARD_IMG_2 = 'https://www.figma.com/api/mcp/asset/7bb3d9bd-3559-4943-b280-92184385e398'

// IDs 101-103 are pre-mint upcoming events — excluded intentionally (not attended yet)
const ALL_EVENTS_MAP = {
  1: { id: 1, title: 'Club Census 3', date: '02/14/2025', category: 'Clubcensus', img: THUMB_CC3 },
  2: { id: 2, title: 'Club Census 2', date: '03/09/2025', category: 'Clubcensus', img: THUMB_CC2 },
  3: { id: 3, title: 'Club Census 1', date: '03/19/2025', category: 'Clubcensus', img: THUMB_CC1 },
  4: { id: 4, title: 'Cal Day', date: '05/02/2025', category: 'Socials', img: THUMB_CALDAY },
  5: { id: 5, title: 'Temple Cross Club', date: '04/28/2025', category: 'Socials', img: THUMB_TEMPLE },
  6: { id: 6, title: 'K1 Speed', date: '04/17/2025', category: 'Socials', img: THUMB_K1 },
  7: { id: 7, title: 'Bottomless Brunch', date: '04/11/2025', category: 'Socials', img: THUMB_BRUNCH },
}


export default function MyEvents() {
  const { dirRef, go } = useNav()
  const { profile, registeredIds, unregister } = useApp()

  const x = dirRef.current * 390
  const pageVariants = {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -x, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  }

  const myEvents = [...registeredIds]
    .map(id => ALL_EVENTS_MAP[id])
    .filter(Boolean)

  return (
    <motion.div
      className="relative w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar"
      style={{ background: '#111010' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute right-[-40px] top-[-60px] w-[280px] h-[280px] rounded-full opacity-20"
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

      {/* Header */}
      <div className="px-[29px] pt-4 pb-2 flex items-center gap-3">
        <img
          src={profile.photoUrl || DEFAULT_AVATAR}
          alt="avatar"
          className="w-[52px] h-[52px] rounded-full object-cover cursor-pointer shrink-0"
          onClick={() => go('/profile', -1)}
        />
        <div className="flex-1">
          <p className="text-white/50 text-[13px] font-body">
            {profile.name ? `Hi, ${profile.name}!` : 'Your events'}
          </p>
          <h1 className="text-white text-[26px] font-display font-semibold leading-tight">
            My Events
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

      {/* ── Tab bar: Events / My Events ── */}
      <div className="px-[29px] mt-2 mb-0">
        <div className="flex gap-6">
          {['Events', 'My Events'].map(tab => {
            const active = tab === 'My Events'
            return (
              <button
                key={tab}
                onClick={() => tab === 'Events' && go('/events', 0)}
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

      {/* My Events list */}
      <div className="px-[29px] mt-4">
        {myEvents.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center pt-20 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{ background: 'rgba(254,169,51,0.1)', border: '1px solid rgba(254,169,51,0.2)' }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#fea933" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="3"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <p className="text-white/60 font-display text-[16px] text-center">
              No registered events yet.
            </p>
            <p className="text-white/30 font-body text-[13px] text-center">
              Go to Events and tap Register!
            </p>
            <motion.button
              onClick={() => go('/events', 0)}
              className="mt-2 px-6 py-2.5 rounded-[22px] text-black text-[14px] font-display font-medium"
              style={{ background: '#fea933' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Browse Events
            </motion.button>
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-col gap-0">
            <AnimatePresence mode="popLayout">
              {myEvents.map(ev => (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 py-4 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                  >
                    {/* Thumbnail */}
                    <div className="w-[68px] h-[68px] rounded-[7px] overflow-hidden shrink-0">
                      <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-display text-[17px] font-medium leading-tight truncate">
                        {ev.title}
                      </p>
                      <p className="text-white/50 font-body text-[12px] mt-0.5">{ev.date}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="text-[10px] font-body px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}
                        >
                          ✓ Registered
                        </span>
                      </div>
                    </div>

                    {/* Unregister */}
                    <motion.button
                      onClick={() => unregister(ev.id)}
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,59,48,0.12)', border: '1px solid rgba(255,59,48,0.25)' }}
                      whileHover={{ scale: 1.1, background: 'rgba(255,59,48,0.22)' }}
                      whileTap={{ scale: 0.9 }}
                      title="Unregister"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,100,80,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Home indicator */}
      <div className="h-12" />
      <div className="sticky bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-40" />
      </div>
    </motion.div>
  )
}
