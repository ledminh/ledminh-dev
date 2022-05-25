import React, { useContext } from 'react';

import styled from 'styled-components';

import Context from '../Layout/Context';

const LevelStyle = {
    1: {
        color: '#006666',
        fontSize: '115%'
    },

    2: {
        color: '#00a1a1',
        fontSize: '110%'
    },

    3: {
        color: 'black',
        fontSize: '107%'
    },

    4: {
        color: '#696969',
        fontSize: '105%'
    }
}


const Emphasize = ({children, level}) => {
    const {highLightLevel} = useContext(Context);

    return (
    <Wrapper level = {level} highLightLevel = {highLightLevel}>
        {children}
    </Wrapper>
    );
}

export default Emphasize;

const Wrapper = styled.span`
    font-size: ${props => LevelStyle[props.level].fontSize};
    color: ${props => !props.highLightLevel ?  LevelStyle[props.level].color : props.highLightLevel == props.level? LevelStyle[props.level].color : `#ededed`};
    font-weight: bold;
`;