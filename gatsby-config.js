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
        token: 'skDE73XvoLqMmOcnnRW26pfwuFk3Ikg7ZZ1LRJBcVHFB9w1XtHvPl5NQTAJSP2sy4PIkciMkKJSPM7l07PAyQvzmkAui91cyza29a0czxt2sVpDAze1cozFPL9ul3NfhVefKDqVc4sUIrtQUb8HydDpM989w5h3nTss3PU45uTLch88MmdEn'
        },
    },
]
};