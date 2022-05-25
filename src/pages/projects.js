import React from 'react';
import Layout from '../Layout';

import styled from 'styled-components';

import {graphql} from 'gatsby';

import ProjectItem from '../components/ProjectItem';

export const query = graphql`
    query getProjects {
        allSanityCategory(sort: {fields: _createdAt}) {
            nodes {
                id
                name
                description
                projects {
                    id
                    name
                    description
                    techs {
                            id
                            name
                    }
                    github_link
                    demo_link
                    website_link
                }
            }
        }
    }
`

function ProjectPage({location, data}) {
    const categories = data.allSanityCategory.nodes;


    return (
        <Layout location={location}>
            <Wrapper>
                {
                    categories.map(({id, name, description, projects}) => (
                        <>
                            <h5 key={"title-" + id}>{name}</h5>
                            <p key={"description-" + id}>{description}</p>
                            {
                                projects.map(p => <ProjectItem key={p.id} {...p} />)
                            }
                        </>
                    ))
                }
                <p className="more">In case you are interested, all of my projects are listed here: <a href="https://github.com/ledminh/my-projects" target='_blank'>Github::My-Projects</a></p>
            </Wrapper>
            
        </Layout>
    )
}


export default ProjectPage;

const Wrapper = styled.div`
    .more {
        margin: 2rem 0;

        text-align: center;

        background-color: #02cccc;
        color: black;
    }
`