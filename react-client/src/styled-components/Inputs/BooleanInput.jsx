import { Checkbox } from 'flowbite-react';

const BooleanInput = ({ placeholder, name, required, method }) => {
    return <Checkbox {...method(name)} className='my-auto' type='checkbox' id={name} name={name} placeholder={placeholder} required={required}/>
};

export default BooleanInput;