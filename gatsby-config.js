module.exports = {
  siteMetadata: {
    title: `Code Quests: Learn to Code`,
    description: `Learn to code for free.`,
    author: `@bcbrian`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-theme-mdx-deck",
      options: {
        // enable or disable gatsby-plugin-mdx
        mdx: true,
        // source directory
        contentPath: "decks",
        // base path for routes generate by this theme
        basePath: "/decks"
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
