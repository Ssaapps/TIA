import React from 'react';

const CircularProgress = ({ percentage }) => (
    <div className="flex items-center justify-center h-screen">
        <div className="relative w-40 h-40">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div
                className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full"
                style={{ transform: `rotate(${percentage * 3.6}deg)` }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold">{percentage}%</span>
            </div>
        </div>
    </div>
);

export default CircularProgress;