import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNav } from '../context/NavContext'

/* ── Figma asset URLs (Admin_1 frame) ── */
const LOGO_AVATAR  = 'https://www.figma.com/api/mcp/asset/23b905e4-827b-4cc5-8f26-8b256f54e937'

// NFT card assets — metallic gold strips only (no outer frame)
const NFT_GOLD_BAR = 'https://www.figma.com/api/mcp/asset/0f70a24f-4c9b-4c49-8b0b-87f55339ef89'

// Per-NFT event photos — real uploaded event photos
const NFT_PHOTO_1  = '/clubcensus0.jpg'
const NFT_PHOTO_2  = '/bali.jpg'
const NFT_PHOTO_3  = '/design-mtg1.jpg'

/* Member headshot photos — from Figma Section 2 (node 5017-3452) */
const MEM_AKSHAT = 'https://www.figma.com/api/mcp/asset/774e8d65-1307-4a41-ad9d-56e3419572fc'
const MEM_SARAH  = 'https://www.figma.com/api/mcp/asset/fc956c55-a53c-426d-bc85-66f4fcad2cc7'
const MEM_TVISHA = 'https://www.figma.com/api/mcp/asset/ea2eda80-f69f-49fb-a536-5a60dc21670d'
const MEM_KELLY  = 'https://www.figma.com/api/mcp/asset/8e98d682-a87e-4c45-94f5-a88b995ab831'
const MEM_ARYAN  = 'https://www.figma.com/api/mcp/asset/c03c4542-3b76-4899-aa90-de0ce28bdc2b'

const MEMBERS = [
  { name: 'Akshat P.',  fullName: 'Akshat Parikh',  dept: 'Des', nfts: 24, avatar: MEM_AKSHAT, color: '#6b4a1e',
    events: [{ name: 'Club Census 1', attended: true }, { name: 'Vara Workshop', attended: true }, { name: 'Dev Edu', attended: false }] },
  { name: 'Sarah M.',   fullName: 'Sarah Mou',       dept: 'Des', nfts: 15, avatar: MEM_SARAH,  color: '#4a3a6b',
    events: [{ name: 'Club Census 1', attended: true }, { name: 'Vara Workshop', attended: false }, { name: 'Dev Edu', attended: true }] },
  { name: 'Tvisha R.',  fullName: 'Tvisha Ranjan',   dept: 'Des', nfts: 10, avatar: MEM_TVISHA, color: '#6b1e3a',
    events: [{ name: 'Club Census 1', attended: true }, { name: 'Vara Workshop', attended: true }, { name: 'Dev Edu', attended: true }] },
  { name: 'Kelly Z.',   fullName: 'Kelly Zhang',     dept: 'Edu', nfts: 22, avatar: MEM_KELLY,  color: '#1e4a6b',
    events: [{ name: 'Club Census 1', attended: false }, { name: 'Vara Workshop', attended: true }, { name: 'Dev Edu', attended: true }] },
  { name: 'Aryan P.',   fullName: 'Aryan Parikh',    dept: 'Dev', nfts: 11, avatar: MEM_ARYAN,  color: '#2e6b1e',
    events: [{ name: 'Club Census 1', attended: true }, { name: 'Vara Workshop', attended: false }, { name: 'Dev Edu', attended: false }] },
]

const EVENT_CARDS = [
  { id: 'c1', photo: NFT_PHOTO_1, label: 'CLUBCENSUS 0',    sub: 'Spring 2025' },
  { id: 'c2', photo: NFT_PHOTO_2, label: 'BALI',            sub: 'Spring 2025' },
  { id: 'c3', photo: NFT_PHOTO_3, label: 'DESIGN MTG 1',    sub: 'Spring 2025' },
]

const INTERESTS = ['Design', 'Blockchain', 'Finance', 'Development', 'NFTs', 'Events', 'Social', 'DeFi']


/* NFT card — photo fills the card with gold strip header/footer */
function NFTCard({ photo, label, sub }) {
  return (
    <div className="relative shrink-0 w-[135px] h-[135px] rounded-[11px] overflow-hidden cursor-pointer"
      style={{ border: '0.5px solid rgba(255,255,255,0.4)' }}>
      {/* Photo — cropped to fill */}
      <img src={photo} alt={label} className="absolute inset-0 w-full h-full object-cover" />

      {/* Top gold strip */}
      <div className="absolute top-0 inset-x-0 h-[14px]" style={{ zIndex: 2 }}>
        <img src={NFT_GOLD_BAR} alt="" className="w-full h-full object-cover" />
      </div>
      {/* Bottom gold strip (flipped) */}
      <div className="absolute bottom-0 inset-x-0 h-[14px]" style={{ zIndex: 2, transform: 'scaleY(-1)' }}>
        <img src={NFT_GOLD_BAR} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Event name on top strip */}
      <p className="absolute top-0 inset-x-0 text-center text-white font-display font-bold leading-[14px]"
         style={{ fontSize: 7, zIndex: 3 }}>
        {label}
      </p>
      {/* Sub label on bottom strip */}
      <p className="absolute bottom-0 inset-x-0 text-center text-white font-display font-bold leading-[14px]"
         style={{ fontSize: 7, zIndex: 3 }}>
        {sub}
      </p>
    </div>
  )
}

/* Member row — collapses to 47px, expands to 163px Figma layout on tap */
function MemberRow({ member, isExpanded, onToggle }) {
  const [imgError, setImgError] = useState(false)
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  function Avatar({ size, cls }) {
    return (
      <div className={`rounded-full overflow-hidden shrink-0 flex items-center justify-center ${cls}`}
        style={{ width: size, height: size, background: imgError ? member.color : 'transparent' }}>
        {!imgError
          ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
          : <span className="text-white font-display font-bold" style={{ fontSize: size * 0.36 }}>{initials}</span>}
      </div>
    )
  }

  return (
    <motion.div
      onClick={onToggle}
      className="relative w-full rounded-[10.86px] overflow-hidden shrink-0 cursor-pointer"
      animate={{ height: isExpanded ? 188 : 47 }}
      style={{
        border: '1px solid rgba(106,106,106,0.28)',
        background: 'linear-gradient(to bottom, rgba(217,217,217,0.09) 28.85%, rgba(255,249,249,0.09) 100%)',
        backdropFilter: 'blur(27px)',
        WebkitBackdropFilter: 'blur(27px)',
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    >
      {/* ── Collapsed: horizontal pill row ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[47px] flex items-center"
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <Avatar size={30} cls="ml-[13px]" />
        <p className="ml-[12px] text-[rgba(255,255,255,0.78)] text-[16px] font-display leading-none flex-1 truncate">
          {member.name}
        </p>
        <div className="mr-[16px] flex items-center gap-[5px] text-[rgba(255,255,255,0.78)] text-[10px] font-display shrink-0">
          <span>Active</span><span className="opacity-30">·</span>
          <span>{member.dept}</span><span className="opacity-30">·</span>
          <span>{member.nfts} NFTs</span>
        </div>
      </motion.div>

      {/* ── Expanded: Figma 163px layout ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isExpanded ? 0.08 : 0 }}
      >
        {/* Left — avatar + large name */}
        <div className="absolute" style={{ left: 22, top: 30 }}>
          <Avatar size={35} cls="" />
          <div className="mt-[9px]">
            {member.fullName.split(' ').map((part, i) => (
              <p key={i} className="text-white font-display leading-[30px]" style={{ fontSize: 31 }}>{part}</p>
            ))}
          </div>
        </div>

        {/* Right — status at top */}
        <div className="absolute flex items-center gap-[5px] text-white/80 font-display"
          style={{ left: 159, top: 26, fontSize: 10 }}>
          <span>Active</span><span className="opacity-30">·</span>
          <span>{member.dept}</span><span className="opacity-30">·</span>
          <span>{member.nfts} NFTs</span>
        </div>

        {/* Vertical divider */}
        <div className="absolute w-px" style={{ left: 148, top: 56, height: 87, background: 'rgba(255,255,255,0.18)' }} />

        {/* Event Attendance label */}
        <p className="absolute text-white/50 font-display" style={{ left: 159, top: 61, fontSize: 9 }}>
          Event Attendance
        </p>

        {/* Event rows */}
        <div className="absolute flex flex-col gap-[19px]" style={{ left: 166, top: 85, width: 158 }}>
          {member.events.map((ev, i) => (
            <div key={i} className="flex items-center justify-between font-display" style={{ fontSize: 10 }}>
              <span className="text-white">{ev.name}</span>
              <span style={{ color: ev.attended ? '#4ade80' : 'rgba(255,255,255,0.35)' }}>
                {ev.attended ? 'Attended' : 'Not Attended'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Profile() {
  const { dirRef, go } = useNav()
  const { profile, saveProfile } = useApp()
  const fileRef      = useRef(null)

  const [name,           setName]          = useState(profile.name || '')
  const [major,          setMajor]         = useState(profile.major || '')
  const [interests,      setInterests]     = useState(profile.interests || [])
  const [photoUrl,       setPhotoUrl]      = useState(profile.photoUrl || null)
  const [editOpen,       setEditOpen]      = useState(!profile.name)
  const [focusedField,   setFocusedField]  = useState(null)
  const [expandedMember, setExpandedMember] = useState(null)
  const [searchOpen,     setSearchOpen]    = useState(false)
  const [searchQuery,    setSearchQuery]   = useState('')

  const filteredMembers = searchQuery.trim()
    ? MEMBERS.filter(m => m.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    : MEMBERS

  const x = dirRef.current * 390
  const pageVariants = {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -x, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  }

  const isReady = name.trim().length > 0 && interests.length > 0 && photoUrl !== null
  const displayName = name.trim() || 'Your Name'
  const displayRole = major.trim() || 'Member'

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoUrl(url)
  }

  function toggleInterest(item) {
    setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  function handleSave() {
    if (!isReady) return
    saveProfile({ name: name.trim(), major: major.trim(), interests, photoUrl })
    setEditOpen(false)
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ambient amber glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-[-387px] top-[-9px] w-[1061px] h-[1072px]"
          style={{
            background: 'radial-gradient(ellipse 55% 45% at 63% 42%, rgba(180,110,10,0.35) 0%, rgba(100,50,0,0.18) 40%, transparent 70%)',
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

      {/* ── Header: avatar (tappable) + role + large name ── */}
      <div className="px-[26px] pt-4">
        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Avatar — only tappable in edit mode; required when no photo */}
        <div className="relative w-[58px] h-[57px] mb-2 group">
          <button
            onClick={() => editOpen && fileRef.current?.click()}
            className={`w-full h-full rounded-full overflow-hidden relative block focus:outline-none ${editOpen ? 'cursor-pointer' : 'cursor-default'}`}
            style={editOpen && !photoUrl ? { boxShadow: '0 0 0 2px #fea933' } : {}}
          >
            <img src={photoUrl || LOGO_AVATAR} alt="avatar" className="w-full h-full object-cover" />
            {editOpen && (
              <div
                className="absolute inset-0 rounded-full flex flex-col items-center justify-center transition-opacity"
                style={{ background: 'rgba(0,0,0,0.52)', opacity: photoUrl ? 0 : 1 }}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path d="M7 2H13L15 5H18C18.55 5 19 5.45 19 6V16C19 16.55 18.55 17 18 17H2C1.45 17 1 16.55 1 16V6C1 5.45 1.45 5 2 5H5L7 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="10" cy="11" r="3" stroke="white" strokeWidth="1.5"/>
                </svg>
                <span className="text-[8px] text-[#fea933] font-display mt-0.5">required</span>
              </div>
            )}
            {editOpen && photoUrl && (
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
                  <path d="M7 2H13L15 5H18C18.55 5 19 5.45 19 6V16C19 16.55 18.55 17 18 17H2C1.45 17 1 16.55 1 16V6C1 5.45 1.45 5 2 5H5L7 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="10" cy="11" r="3" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Role */}
        <p className="text-white/50 text-[15px] font-display mb-1">{displayRole}</p>

        {/* Large name */}
        <div className="text-white font-display font-semibold leading-[57px]" style={{ fontSize: 64 }}>
          {displayName.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between mt-3 mb-4">
          <button
            onClick={() => setEditOpen(v => !v)}
            className="text-white/50 text-[15px] font-display underline underline-offset-2"
          >
            {editOpen ? 'Hide form' : 'Edit profile'}
          </button>

          <motion.button
            onClick={() => go('/events', 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-white text-[14px] font-display"
            style={{
              background: 'linear-gradient(to bottom, rgba(217,217,217,0.5) 28.85%, rgba(255,249,249,0.5) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Browse Events
          </motion.button>
        </div>

        <div className="h-px bg-white/15 mb-4" />
      </div>

      {/* ── Collapsible edit form ── */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-[26px]"
          >
            <div
              className="rounded-[14px] p-4 mb-5"
              style={{
                background: 'linear-gradient(to bottom, rgba(217,217,217,0.12), rgba(255,249,249,0.06))',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(24px)',
              }}
            >
              <div className="mb-4">
                <label className="block text-white/40 text-[10px] font-body uppercase tracking-widest mb-1">
                  Full Name <span style={{ color: '#fea933' }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Megan Patel"
                  className="w-full bg-transparent text-white font-display text-[16px] placeholder-white/20 outline-none py-1.5 border-b"
                  style={{
                    borderColor: focusedField === 'name' ? '#fea933' : 'rgba(255,255,255,0.18)',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white/40 text-[10px] font-body uppercase tracking-widest mb-1">
                  Role / Major
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  onFocus={() => setFocusedField('major')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. President"
                  className="w-full bg-transparent text-white font-display text-[16px] placeholder-white/20 outline-none py-1.5 border-b"
                  style={{
                    borderColor: focusedField === 'major' ? '#fea933' : 'rgba(255,255,255,0.18)',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <p className="text-white/40 text-[10px] font-body uppercase tracking-widest mb-2">
                Interests <span style={{ color: '#fea933' }}>*</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map(item => {
                  const active = interests.includes(item)
                  return (
                    <motion.button
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className="px-3 py-1 rounded-[12px] text-[12px] font-display"
                      style={{
                        background: active ? '#fea933' : 'transparent',
                        border: `1px solid ${active ? '#fea933' : 'rgba(246,232,205,0.45)'}`,
                        color: active ? '#000' : '#f6e8cd',
                        transition: 'all 0.15s ease',
                      }}
                      whileTap={{ scale: 0.93 }}
                    >
                      {item}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <motion.button
              onClick={handleSave}
              disabled={!isReady}
              className="w-full h-[48px] rounded-[24px] text-[15px] font-display font-medium mb-6"
              style={{
                background: isReady ? '#fea933' : 'rgba(255,255,255,0.08)',
                color: isReady ? '#000' : 'rgba(255,255,255,0.3)',
                border: isReady ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.4s, color 0.3s',
                animation: isReady ? 'pulse_amber 1.6s ease-in-out infinite' : 'none',
              }}
              whileHover={isReady ? { scale: 1.03 } : {}}
              whileTap={isReady ? { scale: 0.97 } : {}}
            >
              Save
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── My Events photo cards ── */}
      <div className="px-[26px] mb-1">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-white/50 text-[15px] font-display whitespace-nowrap">My NFTs</p>
          <div className="flex-1 h-px bg-white/15" />
        </div>
      </div>
      <div className="flex gap-[18px] pl-[26px] pr-4 overflow-x-auto hide-scrollbar pb-1 mb-4">
        {EVENT_CARDS.map(card => (
          <NFTCard key={card.id} photo={card.photo} label={card.label} sub={card.sub} />
        ))}
      </div>

      {/* ── Members ── */}
      <div className="px-[26px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-px h-4 bg-white/20" />
            <p className="text-white/50 text-[15px] font-display">Members</p>
            <div className="w-[70px] h-px bg-white/15" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {searchOpen ? (
              <motion.div
                key="search-input"
                initial={{ opacity: 0, width: 100 }}
                animate={{ opacity: 1, width: 160 }}
                exit={{ opacity: 0, width: 100 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-[10px] overflow-hidden"
                style={{ background: 'rgba(217,217,217,0.25)' }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.2" opacity="0.7"/>
                  <path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
                </svg>
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent text-white text-[12px] font-display outline-none w-full min-w-0 placeholder-white/40"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="text-white/50 text-[11px] shrink-0 leading-none"
                >✕</button>
              </motion.div>
            ) : (
              <motion.button
                key="search-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-[10px] shrink-0"
                style={{ background: 'rgba(217,217,217,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.2" opacity="0.7"/>
                  <path d="M9.5 9.5L12 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
                </svg>
                <span className="text-white text-[12px] font-display whitespace-nowrap">Search Members</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-[15px] mb-10">
          {filteredMembers.length > 0 ? filteredMembers.map(m => (
            <MemberRow
              key={m.name}
              member={m}
              isExpanded={expandedMember === m.name}
              onToggle={() => setExpandedMember(expandedMember === m.name ? null : m.name)}
            />
          )) : (
            <p className="text-white/30 text-[13px] font-display text-center py-4">No members found</p>
          )}
        </div>
      </div>

      <div className="sticky bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-[134px] h-[5px] bg-white rounded-full opacity-40" />
      </div>
    </motion.div>
  )
}
