import React from 'react';

const NumberInput = ({icon,placeholder,name,required,method}) => {
    return (
        <div className="flex">
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {icon}
                </div>
                    <input {...method(name)} className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pl-10 rounded-lg" type='number' id={name} name={name} placeholder={placeholder} required={required}/>
            </div>
        </div>
    );
};

export default NumberInput;