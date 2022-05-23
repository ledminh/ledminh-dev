import React from 'react';

import styled from 'styled-components';

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

    return (
    <Wrapper level = {level}>
        {children}
    </Wrapper>
    );
}

export default Emphasize;

const Wrapper = styled.span`
    font-size: ${props => LevelStyle[props.level].fontSize};
    color: ${props => LevelStyle[props.level].color};
    font-weight: bold;
`;