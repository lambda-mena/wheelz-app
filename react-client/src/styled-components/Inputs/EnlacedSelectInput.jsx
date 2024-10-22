import React from 'react'

const EnlacedSelectInput = ({required,name,values,method,defaultValue}) => {

    const val = defaultValue ? defaultValue : '*';
    
    return (
        <select {...method(name)} id={name} name={name} required={required} className="block w-full p-2 border border-gray-300 rounded">
                            <option ></option>
                            {values.map((e) => {
                                
                                if(val == e.name){
                                    return(<option selected key={e.id} value={e.id}>
                                                {e.name}
                                            </option>)
                                }else{
                                    return(<option key={e.id} value={e.id}>
                                                {e.name}
                                            </option>)
                                }
                                
                            })}
        </select>
    );
}

export default EnlacedSelectInput