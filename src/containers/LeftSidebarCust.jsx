import React from 'react';

function LeftSidebarCust() {
    return (
        <div className="w-64 p-4 border-r border-gray-300">
            <button className="flex items-center mb-4 text-lg font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="10" r="2" />
                    <line x1="6" y1="4" x2="6" y2="8" />
                    <line x1="6" y1="12" x2="6" y2="20" />
                    <circle cx="12" cy="16" r="2" />
                    <line x1="12" y1="4" x2="12" y2="14" />
                    <line x1="12" y1="18" x2="12" y2="20" />
                    <circle cx="18" cy="7" r="2" />
                    <line x1="18" y1="4" x2="18" y2="5" />
                    <line x1="18" y1="9" x2="18" y2="20" />
                </svg>
                Filter
            </button>
            <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold">Category</h3>
                <button className="w-full px-4 py-2 mb-2 text-left border rounded border-gray-300 hover:bg-gray-100">Sneakers</button>
                <button className="w-full px-4 py-2 mb-2 text-left border rounded border-gray-300 hover:bg-gray-100">Apparel</button>
                <button className="w-full px-4 py-2 mb-2 text-left border rounded border-gray-300 hover:bg-gray-100">Luxury</button>
                <button className="w-full px-4 py-2 mb-2 text-left border rounded border-gray-300 hover:bg-gray-100">Electronics & Collectibles</button>
                <button className="w-full px-4 py-2 text-left border rounded border-gray-300 hover:bg-gray-100">MadeIndonesia</button>
            </div>
            <div>
                <h3 className="mb-2 text-xl font-semibold">Conditions</h3>
                <button className="flex items-center justify-between w-full px-4 py-2 text-left border rounded border-gray-300 hover:bg-gray-100">
                    Express Shipping
                    <span className="ml-2">⚡</span>
                </button>
            </div>
        </div>
    );
}

export default LeftSidebarCust;
