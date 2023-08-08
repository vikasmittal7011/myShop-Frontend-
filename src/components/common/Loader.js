import React from 'react'

import loader from "../../assets/loader.gif"

const Loader = ({margin, width, height}) => {
  return (
    <div className={`flex justify-center mt-${margin || 52}`}>
        <img src={loader} alt="Loading" width={width || 150} height={height || 150} />
    </div>
  )
}

export default Loader