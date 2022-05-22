import '../global.css';

import * as React from "react"

import styled from 'styled-components';

import Header from './Header';

function Layout({children, location}) {
    

    return (
        <>
            <Header locationPath={location.pathname.substring(1)}/>
            <Main>{children}</Main>
            <Footer></Footer>
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

    box-shadow: 0 0 7px black;
    border-radius: 30px;

    
`;

const Footer = styled.footer``;

