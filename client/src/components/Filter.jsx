import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const Filter = ({ onFilterChange, filter }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [cigaretteAllowed, setCigaretteAllowed] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [capacity, setCapacity] = useState(1);
    const [openFilter, setOpenFilter] = useState(filter);

    const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);
    const [tempCigaretteAllowed, setTempCigaretteAllowed] = useState(false);
    const [tempPetsAllowed, setTempPetsAllowed] = useState(false);
    const [tempCapacity, setTempCapacity] = useState(1);

    useEffect(() => {
        disablePageScroll();
        return () => {
            enablePageScroll();
        };
    }, []);

    const handleCancel = () => {
        setOpenFilter(false);
        enablePageScroll();
    };

    const handleSliderChange = (event, newValue) => {
        setTempPriceRange(newValue);
    };

    const handleMinPriceChange = (e) => {
        const newMin = Number(e.target.value);
        setTempPriceRange([newMin, tempPriceRange[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const newMax = Number(e.target.value);
        setTempPriceRange([tempPriceRange[0], newMax]);
    };

    const handleCigaretteChange = (e) => {
        const isChecked = e.target.checked;
        setTempCigaretteAllowed(isChecked);
    };

    const handlePetsChange = (e) => {
        const isChecked = e.target.checked;
        setTempPetsAllowed(isChecked);
    };

    const handleCapacityChange = (newCapacity) => {
        setTempCapacity(newCapacity);
    };

    const applyFilters = () => {
        setPriceRange(tempPriceRange);
        setCigaretteAllowed(tempCigaretteAllowed);
        setPetsAllowed(tempPetsAllowed);
        setCapacity(tempCapacity);
        updateFilters({ 
            min: tempPriceRange[0], 
            max: tempPriceRange[1], 
            cigaretteAllowed: tempCigaretteAllowed, 
            petsAllowed: tempPetsAllowed, 
            capacity: tempCapacity 
        });
        setOpenFilter(false);
        enablePageScroll();
    };

    const updateFilters = (filters) => {
        onFilterChange(filters);
    };

    return (
        <div className={`${openFilter ? "block" : "hidden"} custom-scrollbar fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 z-[51] py-5`}>
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-[90%] max-w-lg lg:max-w-3xl h-auto max-h-full overflow-y-auto shadow-xl rounded-lg p-8">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-3xl font-bold">Filters</h2>
                    <button className='underline h-max self-start cursor-pointer' onClick={handleCancel}>Cancel</button>
                </div>
                
                {/* Price Range Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">Price Range</label>
                    <p className="mb-2 text-gray-600 dark:text-gray-400">Enter the range of price that you want to travel</p>
                    <Slider
                        value={tempPriceRange}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        step={10}
                        color="black"
                    />
                    <div className="flex justify-between items-center mt-2 space-x-2">
                        <input
                            type="number"
                            value={tempPriceRange[0]}
                            onChange={handleMinPriceChange}
                            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            aria-label="Minimum Price"
                        />
                        <span className="text-gray-600 dark:text-gray-400">-</span>
                        <input
                            type="number"
                            value={tempPriceRange[1]}
                            onChange={handleMaxPriceChange}
                            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            aria-label="Maximum Price"
                        />
                    </div>
                </div>
                
                {/* Cigarette Allowed Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">Cigarette Policy</label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tempCigaretteAllowed}
                                onChange={handleCigaretteChange}
                                color="primary"
                                aria-label="Cigarettes Allowed"
                            />
                        }
                        label="Cigarettes Allowed"
                    />
                </div>
                
                {/* Pets Allowed Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">Pets Policy</label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tempPetsAllowed}
                                onChange={handlePetsChange}
                                color="primary"
                                aria-label="Pets Allowed"
                            />
                        }
                        label="Pets Allowed"
                    />
                </div>
                
                {/* Capacity Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">Capacity</label>
                    <div className='flex gap-5'>
                        {[1, 2, 3, 4].map(num => (
                            <div
                                key={num}
                                onClick={() => handleCapacityChange(num)}
                                className={`hover:bg-n-8/20 cursor-pointer w-[50px] h-max text-center border rounded-xl ${tempCapacity === num ? 'bg-blue-500 dark:bg-gray-600 text-white' : ''}`}
                                aria-label={`Capacity ${num}`}
                            >
                                <span>{num}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <Button
                        onClick={applyFilters}
                        variant="contained"
                        color="primary"
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
