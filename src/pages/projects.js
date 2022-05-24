import React from 'react';
import Layout from '../Layout';


import ProjectItem from '../components/ProjectItem';

function ProjectPage({location}) {
    return (
        <Layout location={location}>
            <h5>VANILA JAVASCRIPT</h5>
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
            <h5>VANILA JAVASCRIPT</h5>
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
            <h5>VANILA JAVASCRIPT</h5>
            <ProjectItem/>
            <ProjectItem/>
            <ProjectItem/>
        </Layout>
    )
}


export default ProjectPage;