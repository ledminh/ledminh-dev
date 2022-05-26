import * as React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';
import Layout from "../Layout";

const NotFoundPage = ({location}) => {
  return (
    <Layout location={location}>
        <Wrapper>
          <Title>404</Title>
          <Description>FILE NOT FOUND</Description>
          <Solution>GO BACK <Link to='/'>HOME</Link></Solution>
        </Wrapper>
    </Layout>
  )
}

export default NotFoundPage

const Wrapper = styled.div`
  width: 20rem;
  height: 20rem;
  
  margin: auto;
  border-radius: 50%;
  background-color: black;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  
`;

const Title = styled.div`
  font-size: 5rem;
  font-weight: bold;

  color: #e3e6e4;
`

const Description = styled.div`
  margin-top: 2.5rem;
  font-size: 2rem;

  color: #bbbdbb;
`

const Solution = styled.div`

margin-top: 1.4rem;
  font-size: 1.7rem;

  color: #bbbdbb;

`
