import React,{useState} from 'react'
import HashLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react';

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const override = css`
        display: block;
        margin: 0 auto;
        borderColor: red;
      `;
    return (
        <div>
            <div className="sweet-loading">

                <HashLoader
                    color='#000'
                    loading={loading}
                    css=''
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

        </div>
    )
}

export default Loader
