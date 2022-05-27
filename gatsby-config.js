module.exports = {
  siteMetadata: {
    title: `LEDMINH DEV`,
    siteUrl: `https://www.ledminh.dev`
  },
  plugins: [
    "gatsby-plugin-styled-components", 
    "gatsby-plugin-react-helmet", 
    
    {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, 
  
  "gatsby-plugin-image",      
  "gatsby-plugin-sharp", 
  "gatsby-transformer-sharp",
  
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: 'gatsby-plugin-page-creator',
    options: {
      path: `./src/pages/`,
    },
  },
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      defaultLayouts: {
        pages: require.resolve(`./src/Layout`)
      }
    }
  },

  {
    resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'gcme95ee',
        dataset: "main",
       
      },
    },
]
};