import * as React from "react"

import styled from 'styled-components';

import { Link } from "gatsby";


const Header = () => (
    <Wrapper>
        <Title>
            <Name><h1>LEDMINH</h1></Name>
            <Dot/>
            <Extension><h3>dev</h3></Extension>
        </Title>
        <Nav>
            <Ul>
                <Li active><Link to='/'>Home</Link></Li>
                <Li><Link to='education'>Education</Link></Li>
                <Li><Link to='projects'>Projects</Link></Li>
                <Li><Link to='contact'>Contact</Link></Li>
            </Ul>
        </Nav>
    </Wrapper>

)

export default Header;

const Wrapper = styled.header`
    max-width: 1200px;
    margin: auto;
`;

const Title = styled.div`
    display: block;
    width: 80%;
    margin: 2rem auto .5rem;
    
    text-align: center;
    

    border-bottom: 7px double #6b6b6b; 
`;


const Name = styled.span`
    display: inline-block;
    color: #6b6b6b;
    margin-right: .5rem;
`;


const Dot = styled.span`
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: red;

    box-shadow: 0 0 10px red;
    margin-right: .5rem;
`;

const Extension = styled.span`
    display: inline-block;

    font-family: 'Josefin Sans', sans-serif;
    font-style: italic;

    color: #006666;

    text-shadow: 2px 2px 2px black;
    
`;



const Nav = styled.nav`
    width: 80%;
    margin: auto;
    margin-top: 1rem;
`;

const Ul = styled.ul`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    list-style-type: none;
`;

const Li = styled.li`
    flex-basis: 22%;
    padding: .3rem;
    text-align: center;

    border: 2px solid white;

    transition: border .4s, background-color .4s;

    a,
    a:hover,
    a:active,
    a:visited {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        text-decoration: none;

        color: #006666;

        font-weight: 600;
    }

    :hover {
        border: 2px solid red;
    }

    :active {
        background-color: #f0f0f0;
    }

    ${props => props.active? `
        border-bottom: 2px solid red;
    `:``}
`;
