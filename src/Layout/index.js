import '../global.css';

import * as React from "react"

import Helmet from 'react-helmet';

import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';


import Context from './Context';

function Layout({children, location}) {
    const [highLightLevel, setHighLightLevel] = React.useState(false);

    return (
        <>  
            <Helmet>
                <script src="https://kit.fontawesome.com/6a23bab7e7.js" crossorigin="anonymous"></script>
            </Helmet>
            <Header locationPath={location.pathname.substring(1)}/>
            
            <Context.Provider value={{highLightLevel, setHighLightLevel}}>
                <Main highLightLevel={highLightLevel}>
                    {children}
                </Main>
            </Context.Provider>
            <Footer/>

            
        </>
    )
}

export default Layout;




const Main = styled.main`
    width: 80%;
    max-width: 66ch;

    margin: auto;
    margin-top: 2rem;

    padding: 1rem;


    color: #616161;

    transition: color .3s;

    a,
    a:hover,
    a:active,
    a:visited {
        text-decoration: none;
        color: #7a1f0f;
        font-weight: bold;

        transition: border .3s;
    }

    a:hover {
        border-bottom: 2px solid #7a1f0f;
    }


    .intro {
        display: inline-block;
        color: black;
        font-weight: 600;
        font-style: italic;
        margin-bottom: 1rem;
    }

    h5 {
        margin: 2rem 0 1rem;
        border-bottom: 1.2px solid black;
    }

    ${props => props.highLightLevel?`
        color: #ededed;
        a,
        a:hover,
        a:active,
        a:visited { 
            color: #ededed;
        }
    `: ``}
`
