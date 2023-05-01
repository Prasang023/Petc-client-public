import React from 'react'
import ReactLoading from "react-loading";

const Loader = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <ReactLoading type="spinningBubbles" color="#FAA727" />
        </div>
    )
}

export default Loader
