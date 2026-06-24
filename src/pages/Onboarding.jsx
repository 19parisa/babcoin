import { motion } from 'framer-motion'
import { useNav } from '../context/NavContext'

const BG_IMAGE = 'https://www.figma.com/api/mcp/asset/a0a26800-8283-46de-a1a5-49aa6d7a951b'
const COIN_IMAGE = 'https://www.figma.com/api/mcp/asset/c3ba2843-ccb6-4998-b432-df363e55c0c6'

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Onboarding() {
  const { dirRef, go } = useNav()
  const x = dirRef.current * 390
  const pageVariants = {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -x, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a0c00 0%, #0d0404 60%, #000 100%)' }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: `url("${BG_IMAGE}")`, opacity: 0.9 }}
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute left-[-200px] top-[-150px] w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(254,169,51,0.4) 0%, rgba(254,203,56,0.1) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D coin graphic */}
      <motion.div
        className="absolute left-[-50px] top-[40px] w-[320px] h-[280px]"
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={COIN_IMAGE}
          alt="B@B Coin"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Status bar */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center">
        <span className="text-white text-[15px] font-semibold font-display">9:41</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
            <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
            <rect x="5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
            <rect x="10" y="0.5" width="3" height="11.5" rx="1" opacity="0.8"/>
            <rect x="15" y="0" width="3" height="12" rx="1"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <path d="M8 2.4C5.6 2.4 3.5 3.4 2 5l1.5 1.5C4.7 5.2 6.2 4.4 8 4.4s3.3.8 4.5 2.1L14 5c-1.5-1.6-3.6-2.6-6-2.6z"/>
            <path d="M8 5.6c-1.4 0-2.6.6-3.5 1.5L6 8.6C6.5 8 7.2 7.6 8 7.6s1.5.4 2 1L11.5 7c-.9-.9-2.1-1.4-3.5-1.4z"/>
            <circle cx="8" cy="10.5" r="1.5"/>
          </svg>
          <div className="flex items-center">
            <div className="w-[22px] h-[11px] rounded-[3px] border border-white/60 p-[1px]">
              <div className="w-full h-full bg-white rounded-[2px]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pb-12 px-[34px]"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Brand name */}
        <motion.div variants={fadeUp} className="mb-3">
          <h1 className="text-[45px] font-display font-semibold leading-tight tracking-tight">
            <span className="text-white">B@B </span>
            <span style={{ color: '#fecb38' }}>Coin</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-white/80 text-[26px] font-display font-light leading-tight mb-6"
        >
          Easy for Beginners,<br />Powerful for All
        </motion.p>

        {/* Description */}
        <motion.div variants={fadeUp} className="flex items-start gap-3 mb-10">
          <svg className="mt-1 shrink-0" width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M10 1L12.4 6.6L18.5 7.6L14.3 11.7L15.3 17.8L10 14.9L4.7 17.8L5.7 11.7L1.5 7.6L7.6 6.6L10 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <p className="text-white/70 text-[15px] font-display font-light leading-[1.5]">
            Effortless attendance for everyone, discover how this application can grow yourself and this club collectively!
          </p>
        </motion.div>

        {/* LOG IN button */}
        <motion.button
          variants={fadeUp}
          onClick={() => go('/profile', 1)}
          className="w-full h-[46px] rounded-[23px] text-black text-[15px] font-display font-medium tracking-widest"
          style={{ background: '#fea933', boxShadow: '0 4px 16px rgba(254,169,51,0.5)' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          LOG IN
        </motion.button>
      </motion.div>

      {/* Home indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-full opacity-60" />
    </motion.div>
  )
}
