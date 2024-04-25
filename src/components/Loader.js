import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";


function Loader() {

    let [loading, setLoading] = useState(true);

    return (
        <div className='flexLoaderErrorSuccess '>
            <div className="sweet-loading">
                <HashLoader
                    color='#000'
                    loading={loading}
                    css=''
                    size={80}
                />
            </div>

        </div>
    )
}

export default Loader
