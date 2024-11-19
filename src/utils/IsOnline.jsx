import React, { useState, useEffect } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

const IsOnline = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showOfflineToast, setShowOfflineToast] = useState(!navigator.onLine);
    const [showOnlineToast, setShowOnlineToast] = useState(false);

    useEffect(() => {
        const updateOnlineStatus = () => {
            if (navigator.onLine) {
                setIsOnline(true);
                setShowOfflineToast(false);
                setShowOnlineToast(true);
                setTimeout(() => setShowOnlineToast(false), 5000);
            } else {
                setIsOnline(false);
                setShowOfflineToast(true);
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    const handleCloseOfflineToast = () => setShowOfflineToast(false);

    return (
        <>
            {showOnlineToast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-md bg-green-200 border border-green-500 text-green-500 flex items-center justify-between w-64">
                    <span>Back online!</span>
                </div>
            )}

            {showOfflineToast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-1 text-[13px] rounded-md shadow-md bg-red-200 border border-red-600 text-red-500 flex items-center justify-between w-72 md:w-82">
                    <div className="flex items-start flex-col">
                        <span>You appear to be offline. Some features may be unavailable.</span>
                        <div className="flex items-center gap-2 -mt-2">
                            <span>Trying to reconnect</span>
                            <FaSyncAlt className="animate-spin w-3 h-3 text-red-400" />
                        </div>
                    </div>
                    <button onClick={handleCloseOfflineToast} className="ml-4 text-lg font-bold hover:text-gray-200">
                        &times;
                    </button>
                </div>
            )}
        </>
    );
};

export default IsOnline;
