import React, { useContext, useState } from "react";

import styled from 'styled-components';
import Context from "../Layout/Context";

const levels = [
    {
        title: 'Very comfortable',
        explain: `I can make them do almost anything I want. If there's something I don't know, I know exactly where to look.`,
        color: '#006666'
    },

    {
        title: 'Comfortable',
        explain: `I know enough to create interesting things using these techs. If there is something I don't know, it might take longer to do some research, but not too long, 1 or 2 hours max.`,
        color: '#00a1a1'
    },

    {
        title: `Used to be comfortable`,
        explain: `I used to be comfortable working with them. I might need 2 to 3 days to brush up and 1 week to really up to speed.`,
        color: 'black'
    },

    {
        title: `Have some idea`,
        explain: `I know what they are and even used them at some point. But it would take a lot of time to master.`,
        color: '#696969'

    }
]





function ExpertiseLevel() {
    const {highLightLevel, setHighLightLevel} = useContext(Context);

    return (
        <Wrapper>
            <Title>LEVEL OF EXPERTISE</Title>
            <Description>
                (color codes of how much I know about the techs mentioned above. Hover on each line below to know which ones belongs to which level)
            </Description>
            {
                levels.map((level, i) => <Level 
                                                key={level.title} 
                                                title={level.title} 
                                                color={level.color} 
                                                setHighLightLevel = {setHighLightLevel}
                                                level={i + 1}
                                                />)
            }         
            <LevelExplain>
                {
                    highLightLevel? levels[highLightLevel - 1].explain: ''
                }
            </LevelExplain>
            
            

        </Wrapper>
    )
}


export default ExpertiseLevel;




const Wrapper = styled.div`
    font-family: monospace;
    
    border: 1px solid #616161;
    border-radius: 30px 30px 0 0;

    margin-top: 2rem;

    color: #616161;

`

const Title = styled.div`
    font-size: 1rem;
    margin-left: 1rem;
    background-color: white;
    display: inline-block;

    font-weight: bold;
    transform: translateY(-1.3rem);

`;

const Description = styled.div`
    font-size: 1rem;
    line-height: 1.5rem;
    font-style: italic;
    transform: translateY(-1.3rem);
    padding: 0 1rem;
`

const Level = ({title, color, level, setHighLightLevel}) => {

    const mouseEnterHandle = () => {
        setHighLightLevel(level);
    }

    const mouseLeaveHandle = ()  => {
        setHighLightLevel(false);
    }

    return (
        <LevelWrapper 
            color={color}
            onMouseEnter={mouseEnterHandle}
            onMouseLeave={mouseLeaveHandle}
            >
            <ColorBox color={color}/>
            {title}
        </LevelWrapper>
    )
}

const LevelWrapper = styled.div`
    display: inline-block;
    font-size: 1rem;
    margin-left: 1.5rem;

    color: ${props => props.color};

    font-weight: bold;

    cursor: default;
`

const ColorBox = styled.div`
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 3.5px solid black;
    margin-right: 1rem;

    background-color: ${props => props.color}
`;

const LevelExplain = styled.div`
    background-color: #dedede;
    font-size: 1rem;

    line-height: 1.5rem;
    padding: 1rem;

    min-height: 6.5rem;
`