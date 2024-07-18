import React from 'react';

const SelectInput = ({required,name,values,method}) => {
    return (
        <select {...method(name)} id={name} name={name} required={required} className="block w-full p-2 border border-gray-300 rounded">
                            {values.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
        </select>
    );
};

export default SelectInput;