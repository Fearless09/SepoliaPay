import React from 'react';
import useOutsideClickClose from '../hooks/useOutsideClickClose';

const AnimatedModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const ref = useOutsideClickClose<HTMLDivElement>(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div
        ref={ref}
        className="bg-white rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-100 hover:scale-105"
      >
        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
        <p className="mb-4">This is an animated modal. Click outside to close it.</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnimatedModal; 