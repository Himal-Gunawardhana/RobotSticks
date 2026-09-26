import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Mascot = ({ isVisible, message, position = 'bottom-right', style = {}, emoji = '🤖', imgSrc }) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right': return { bottom: '-20px', right: '-20px' };
      case 'top-right': return { top: '-20px', right: '-20px' };
      case 'bottom-left': return { bottom: '-20px', left: '-20px' };
      case 'top-left': return { top: '-20px', left: '-20px' };
      case 'center': return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default: return { bottom: '-20px', right: '-20px' };
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12, mass: 1.2 }}
          style={{
            position: 'absolute',
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            pointerEvents: 'none',
            ...getPositionStyles(),
            ...style
          }}
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0, originX: position.includes('right') ? 1 : 0, originY: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 12 }}
              style={{
                background: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                border: '2px solid var(--dark-text)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--dark-text)',
                maxWidth: '200px',
                whiteSpace: 'normal',
                textAlign: 'center',
                lineHeight: 1.4,
                position: 'relative',
                marginBottom: '1rem',
              }}
            >
              {message}
              {/* Speech bubble pointer */}
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: position.includes('right') ? '15px' : 'auto',
                left: position.includes('left') ? '15px' : 'auto',
                width: '10px',
                height: '10px',
                background: 'white',
                borderRight: '2px solid var(--dark-text)',
                borderBottom: '2px solid var(--dark-text)',
                transform: 'rotate(45deg)',
              }} />
            </motion.div>
          )}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: '3rem',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imgSrc ? (
              <img src={imgSrc} alt="Mascot" style={{ width: '80px', height: 'auto', objectFit: 'contain' }} />
            ) : (
              emoji
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Mascot;
