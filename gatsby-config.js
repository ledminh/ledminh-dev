module.exports = {
  siteMetadata: {
    title: `Minh Le`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-plugin-page-creator',
    options: {
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      defaultLayouts: {
        data: require.resolve(`${__dirname}/src/Layout`)
      }
    }
  }
]
};