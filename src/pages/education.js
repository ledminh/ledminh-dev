import React from 'react';
import EducationItem from '../components/EducationItem';

import { StaticImage } from "gatsby-plugin-image";
import Layout from '../Layout';

const EductionPage = ({location}) => {

    return (
        <Layout location={location}>
        <EducationItem 
            Logo = {
                <StaticImage 
                    src='../images/sjsu-logo.jpg' 
                    placeholder="dominantColor"
                    alt="logo" 
                    />
            }
            title = "SAN JOSE STATE UNIVERSITY"
            description = "Bachelor's degree, Computer Science, GPA: 3.8"  
            year = {{from: 2018, to: 2020}}
            degreeLink = "https://onedrive.live.com/?cid=42dd46ce862a5489&id=42DD46CE862A5489%21752132&ithint=file%2Cpdf&authkey=%21AGVyqdEcT76HNrQ"
        />

        <EducationItem 
            Logo = {
                <StaticImage 
                    src='../images/deanza-logo.jpg' 
                    placeholder="dominantColor"
                    alt="logo" 
                    />
            }
            title = "DE ANZE COLLEGE"
            description = "Asscociate's degree, Computer Science"  
            year = {{from: 2013, to: 2017}}
        />

        <EducationItem 
            Logo = {
                <StaticImage 
                    src='../images/freecodecamp-logo.png' 
                    placeholder="dominantColor"
                    alt="logo" 
                    />
            }
            title = "FREE CODE CAMP"
            description = "Full Stack Web Development Certification"  
            year = {{from: 2015 , to: 2016}}
            degreeLink = "https://www.freecodecamp.org/certification/ledminh/legacy-front-end"
        />

        </Layout>
    )
}


export default EductionPage;


