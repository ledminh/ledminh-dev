import React from "react";

import styled from 'styled-components';

const Footer = () => (
    <Wrapper>
        <small>&copy; Copyright {new Date().getFullYear()} Minh Le. All Rights Reserved.</small>
    </Wrapper>
)
export default Footer;

const Wrapper = styled.footer`
    border-top: 2px solid gray;
    width: 80%;
    padding-top: 2rem;
    margin: 2rem auto 2rem;
    text-align: center;
`;
