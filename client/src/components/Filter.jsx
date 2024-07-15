import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useTranslation } from 'react-i18next';

const Filter = ({ onFilterChange, filter }) => {
    const { t } = useTranslation();
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [smoking, setSmoking] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [capacity, setCapacity] = useState(1);
    const [openFilter, setOpenFilter] = useState(filter);

    const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);
    const [tempSmoking, setTempSmoking] = useState(false);
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
        setTempSmoking(isChecked);
    };

    const handlePetsChange = (e) => {
        const isChecked = e.target.checked;
        setTempPetsAllowed(isChecked);
    };

    const handleCapacityChange = (newCapacity) => {
        setTempCapacity(newCapacity);
        console.log(tempCapacity);
    };

    const applyFilters = () => {
        setPriceRange(tempPriceRange);
        setSmoking(tempSmoking);
        setPetsAllowed(tempPetsAllowed);
        setCapacity(tempCapacity);
        updateFilters({ 
            min: tempPriceRange[0], 
            max: tempPriceRange[1], 
            smoking: tempSmoking, 
            pets: tempPetsAllowed,   
            capacity: tempCapacity 
        });
        setOpenFilter(false);
        enablePageScroll();
    };

    const updateFilters = (filters) => {
        onFilterChange(filters);
    };

    return (
        <div className={`${openFilter ? "block" : "hidden"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 z-[51] py-5`}>
            <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 w-[90%] max-w-lg lg:max-w-3xl h-auto max-h-full overflow-y-auto shadow-xl rounded-lg p-8">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-3xl font-bold">{t("EXPLORE.Filter.filters")}</h2>
                    <button className='underline h-max self-start cursor-pointer' onClick={handleCancel}>{t("EXPLORE.Filter.cancel")}</button>
                </div>
                
                {/* Price Range Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">{t("EXPLORE.Filter.priceRange")}</label>
                    <p className="mb-2 text-gray-600 dark:text-gray-400">{t("EXPLORE.Filter.priceDesc")}</p>
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
                            className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            aria-label="Minimum Price"
                        />
                        <span className="text-gray-600 dark:text-gray-400">-</span>
                        <input
                            type="number"
                            value={tempPriceRange[1]}
                            onChange={handleMaxPriceChange}
                            className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                            aria-label="Maximum Price"
                        />
                    </div>
                </div>
                
                {/* Cigarette Allowed Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">{t("EXPLORE.Filter.smoking")}</label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tempSmoking}
                                onChange={handleCigaretteChange}
                                color="primary"
                                aria-label={`${t("EXPLORE.Filter.smokingAllowed")}`}
                            />
                        }
                        label="Smoking Allowed"
                    />
                </div>
                
                {/* Pets Allowed Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">{t("EXPLORE.Filter.pets")}</label>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tempPetsAllowed}
                                onChange={handlePetsChange}
                                color="primary"
                                aria-label={`${t("EXPLORE.Filter.petsAllowed")}`}
                            />
                        }
                        label="Pets Allowed"
                    />
                </div>
                
                {/* Capacity Section */}
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2">{t("EXPLORE.Filter.capacity")}</label>
                    <div className='flex gap-5'>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div
                                key={num}
                                onClick={() => handleCapacityChange(num)}
                                className={`hover:bg-n-8/20 cursor-pointer w-[50px] h-max text-center border rounded-xl ${tempCapacity === num ? 'bg-blue-500 dark:bg-gray-600 text-white' : ''}`}
                                aria-label={`${t("EXPLORE.Filter.capacity")} ${num}`}
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
                        {t("EXPLORE.Filter.apply")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
