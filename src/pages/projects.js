import React from 'react';
import Layout from '../Layout';

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
        </Layout>
    )
}


export default ProjectPage;