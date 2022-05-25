import React, { useState } from 'react';

import styled from 'styled-components';


const ProjectItem = ({id, name, description, techs, github_link, demo_link, website_link}) => {

    const [expanded, setExpanded] = useState(false);


    return (
        <Wrapper key={id} expanded={expanded}>
            <Title expanded={expanded}>
                <span>{name}</span>
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className={`fa fa-solid fa-angle-down ${expanded?'fa-rotate-180' : ''}`}
                    />
            </Title>
            <Content expanded={expanded}>
                <Description expanded={expanded}>
                    {
                        description
                    }
                </Description> 
                <Techs>
                    {
                        techs.map(t => (
                            <Tech key={t.id}><span>{t.name}</span></Tech>
                        ))
                    }
                </Techs> 
                <Links>
                    {github_link? <a href={github_link}>GITHUB</a>: ''}
                    {demo_link? <a href={demo_link}>DEMO</a>: ''}
                    {website_link? <a href={website_link}>WEBSITE</a>: ''}
                </Links>
            </Content>
            
        </Wrapper>
    )
}

export default ProjectItem;

const Wrapper = styled.div`
    width: 80%;
    margin: 1rem auto 0;
    border: 1px solid #4d4d4d;

    
    box-shadow: 0 0 0 black;

    ${props => props.expanded? `
        box-shadow: 0 0 5px black;

    `:``}
`

const Title = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;

    border-bottom: 1px solid #4d4d4d; 

    
    transition: background-color .3s;

    ${props => props.expanded? `
        background-color: #f5d9d7;

    `:``}
    button {
        font-size: 1.5rem;
        transition: transform .3s;

        background-color: inherit;
        color: inherit;
        border: none;

        cursor: pointer;

        :hover {
            color: red;
        }
    }


`

const Content = styled.div`
    padding: 0rem 1rem;

    
    opacity: 0;
    max-height: 0;

    
    overflow: hidden;

    transition: opacity .3s, max-height .3s, padding .3s;
    ${props => props.expanded? `
        opacity: 1;
        max-height: 400px;

        padding: 1rem 1rem;
    `: ``}
`

const Description = styled.div`
    font-size: 1.2rem;
    font-style: italic;

    border-bottom: 1px solid #4d4d4d;


`

const Techs = styled.ul`
    display: flex;
    flex-flow: row wrap;

    align-items: center;
    list-style-type: none;

    
    font-size: .9rem;
    
    padding-top: 1rem;

    :before {
        content: "TECH USED: ";
        font-weight: 600;
        display: inline-block;
        padding: 0;
    }
`;

const Tech = styled.li`
    margin-left: .5rem;
    

    span {
        background-color: #525252;
        color: #d1d1d1;
        border-radius: 20px;
        padding: .4rem;



    }
    
    
  
`;


const Links = styled.div`
    margin-top: 1rem;

    a {
        margin-right: 1.2rem;
        font-size: 1rem;
        padding: .4rem;
        border-radius: 20px;
        background-color: #ded9d9;


    }
`