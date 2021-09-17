import React from 'react'
import NavBar from './NavBar'


function LayOut({children}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default LayOut;
