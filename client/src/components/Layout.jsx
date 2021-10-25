import React from 'react'
import NavBar from './NavBar'
import styled from "styled-components";


const MainPage = styled.div`
    display:flex;
    flex-direction:column;
    width: 70vw;
    justify-content: center;
    align-items: center;
` 


function LayOut({children}) {
    return (
        <MainPage>
            <NavBar />
            {children}
        </MainPage>
    )
}

export default LayOut;
