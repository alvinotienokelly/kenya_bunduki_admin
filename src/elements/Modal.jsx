import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ title, children, onClose }) => {
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div
                ref={modalRef}
                className="relative max-h-[95vh] overflow-y-auto w-full max-w-lg p-4 rounded-lg shadow-lg mx-4 md:mx-0 transform transition-transform duration-300 ease-in-out translate-y-8 opacity-0 animate-modal-slide bg-white dark:bg-gray-700"
            >
                <div className="flex items-center justify-between mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
                    <h2 className="text-[18px] font-medium text-primary dark:text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="mb-4 text-gray-700 dark:text-gray-300">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
