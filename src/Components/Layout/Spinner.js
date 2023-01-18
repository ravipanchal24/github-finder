import React from 'react';
import logo from './spinner.gif'
const Spinner = () => {
    return (
        <div>
            <img src={logo} alt="spinner" style={{ width: '200px', height: '200px', margin: 'auto', display: 'block' }} />
        </div>
    );
}

export default Spinner;