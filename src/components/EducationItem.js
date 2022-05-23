import React from "react";

import styled from 'styled-components';

const EducationItem = ({Logo, title, description, year, degreeLink}) => {

    return (
        <Wrapper>
            <div className="logo">
                {Logo}
            </div>
            <div className='text'>
                <div className='title'>{title}</div>
                <div className='description'>{description}</div>
                <div className='year'>{year.from} - {year.to}</div>
                {degreeLink? 
                    <div className="view-degree"><a href={degreeLink} target='_blank' rel="noreferrer">VIEW DEGREE</a></div>
                    : ''
                }
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

    transition: all .3s ease; 

    .logo {
        position: relative;
        width: 120px;
        margin-right: 1rem;
        display: grid;

        justify-content: center;
        align-content: center;

        border-right: 1.7px solid #d1bebc;

        opacity: .7;

        transition: all .3s ease; 

        img {
            width: 100%;
        }
    }

    .text {
        position: relative;
    
        .view-degree  {
            position: absolute;
            right: 0;
            bottom: 0;

            a {
                width: 100%;
                height: 100%;

                border: none;
                background-color: #873b36;
                color: #dbdbdb;

                padding: .3rem;
                border-radius: 10px;
                font-size: .8rem;

                opacity: 0;
                transition: all .3s ease;
            
                :hover {
                    background-color: #632b28;
                }

                :active {
                    background-color: #401b1a;
                }
            }
             

        }

    }



    .title {
        font-weight: bold;
        
        transition: all .3s ease; 

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

            opacity: 1;
        }

        .title {
            color: red;
            text-shadow: 0 0 1px red;
        }

        .text {
            .view-degree a {
                opacity: 1;
            }
        }

        

    }

    @media (max-width: 837px)  {
            .logo {
                width: 100px;
            }

            .text {
                font-size: 1rem;
                line-height: 1.5rem;

                .view-degree a {
                    font-size: .8rem;
                    padding: .2rem;
                }
            }
    }

    @media (max-width: 688px) {
        padding: .5rem;
        .logo {
            display: none;
        }

        .text {
            .view-degree {
                right: 0;
                bottom: 0;
            }
        }
    }

`;





