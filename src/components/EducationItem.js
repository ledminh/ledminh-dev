import React from "react";

import styled from 'styled-components';

const EducationItem = () => {

    return (
        <Wrapper>
            <div className="logo"><img src="https://www.ledminh.dev/static/media/sjsu.67aed00b.jpg"></img></div>
            <div className='text'>
                <div className='title'>SAN JOSE STATE UNIVERSITY</div>
                <div className='description'>Bachelor's degree, Computer Science, GPA: 3.8</div>
                <div className='year'>2018 - 2020</div>
            </div>            
        </Wrapper>
    )
}

export default EducationItem;

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto 1rem;
    display: flex;

    border: 1.7px solid #d1bebc;
    


    justify-items: center;
    align-items: center;

    font-size: 1.2rem;

    

    .logo {
        width: 120px;
        margin-right: 1rem;
        display: grid;

        justify-content: center;
        align-content: center;

        border-right: 1.7px solid #d1bebc;

        img {
            width: 100%;
        }
    }

    .text {
        display: grid;
    }

    .title {
        font-weight: bold;
    }

    .description {
        font-style: italic;
    }

    .year {
        font-family: monospace;    
    }

    &:hover {
        border: 1.7px solid black;
        text-shadow: 0 0 1px black;
        
        .logo {
            border-right: 1.7px solid black;

        }

        .title {
            color: red;
            text-shadow: 0 0 1px red;
        }



    }

`;





