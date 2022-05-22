import '../global.css';

import * as React from "react"

import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

function Layout({children, location}) {
    

    return (
        <>
            <Header locationPath={location.pathname.substring(1)}/>
            <Main>
                {children}
            </Main>
            <Footer/>
            
        </>
    )
}

export default Layout;




const Main = styled.main`
    width: 80%;
    max-width: 64ch;

    margin: auto;
    margin-top: 2rem;

    padding: 1rem;


    color: #616161;


`
