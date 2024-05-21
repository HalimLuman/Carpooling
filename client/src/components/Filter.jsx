import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [cigaretteAllowed, setCigaretteAllowed] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const newPriceRange = { ...priceRange, [name]: value };
        setPriceRange(newPriceRange);
        onFilterChange({ ...newPriceRange, cigaretteAllowed, petsAllowed });
    };

    const handleCigaretteChange = (e) => {
        const isChecked = e.target.checked;
        setCigaretteAllowed(isChecked);
        onFilterChange({ ...priceRange, cigaretteAllowed: isChecked, petsAllowed });
    };

    const handlePetsChange = (e) => {
        const isChecked = e.target.checked;
        setPetsAllowed(isChecked);
        onFilterChange({ ...priceRange, cigaretteAllowed, petsAllowed: isChecked });
    };

    return (
        <div className="bg-n-1 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        name="min"
                        value={priceRange.min}
                        onChange={handlePriceChange}
                        placeholder="Min"
                        className="border border-gray-300 bg-n-1 text-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        name="max"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                        placeholder="Max"
                        className="border border-gray-300 bg-n-1 text-gray-700 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={cigaretteAllowed}
                        onChange={handleCigaretteChange}
                        className="mr-2"
                    />
                    Cigarettes Allowed
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={petsAllowed}
                        onChange={handlePetsChange}
                        className="mr-2"
                    />
                    Pets Allowed
                </label>
            </div>
        </div>
    );
};

export default Filter;
