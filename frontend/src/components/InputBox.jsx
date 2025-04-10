import React from 'react';

export const InputBox = ({ label, placeholder}) => {
    return (
        <div className="w-full mt-1.5">
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 ml-1.5 mt-1">
                    {label}
                </label>
            </div>
            <div className="ml-1 mr-1">
                <input placeholder={placeholder}className={"w-full px-3 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg placeholder-gray-400 "}/>
            </div>
        </div>
    );
};