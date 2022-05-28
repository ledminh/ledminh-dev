import React from 'react';

import styled from 'styled-components';

import Layout from '../Layout';

function ContactPage({location}) {
    return (
        <Layout location={location}>
            <Wrapper>
                <i class="fa-3x fa fa-solid fa-address-book"></i>
                
                <p>THERE ARE 2 PLACES WHERE YOU CAN FIND ME</p>
                
                <AWrap>
                    <a href='https://www.linkedin.com/in/ledminh/'>
                        LinkedIn
                    </a>
                </AWrap>

                <AWrap>
                    <a href='https://github.com/ledminh'>
                        Github
                    </a>
                </AWrap>


                <p>OR YOU CAN SEND AN EMAIL TO</p>

                <AWrap>
                    <a href='mailto=minh.le@ledminh.dev'>
                        minh.le@ledminh.dev
                    </a>
                </AWrap>
                

            </Wrapper>            
        </Layout>
    )
}

const Wrapper = styled.div`
    text-align: center;

    border: 2px solid #006666;
    border-radius: 30px;

    box-shadow: 0 0 5px black;
    background-color: #f2f0f0;
    padding: 1rem;

    p {
        margin: 1rem 0;
        transform: translateY(-2rem);
    }


    .fa-address-book {
        color: #006666;
        margin-bottom: 2rem;

        transform: translateY(-2rem);
    }

`

const AWrap = styled.div`
    transform: translateY(-2rem);
`;

export default ContactPage;