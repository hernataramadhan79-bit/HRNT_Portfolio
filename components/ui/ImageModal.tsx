import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-5xl max-h-[90vh] bg-gray-900/50 rounded-lg overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-500/20"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          >
            <img src={imageUrl} alt="Certificate" className="object-contain h-full w-auto max-h-[85vh]" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-cyan-400/50 hover:text-black transition-colors"
              aria-label="Close image view"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
