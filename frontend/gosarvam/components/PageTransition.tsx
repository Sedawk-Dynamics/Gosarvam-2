'use client';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

/* Wraps every page in a Motion slide-in animation — northgarden style.
   New page slides in from the right (x: 60px → 0) with the same
   cubic-bezier(0.32, 0.72, 0, 1) deceleration curve they use. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.52, ease: [0.32, 0.72, 0, 1] }}
      style={{ display: 'block' }}
    >
      {children}
    </motion.div>
  );
}
