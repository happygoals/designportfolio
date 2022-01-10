/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: "Haemin Ryu",
    description: "a design and HCI enthusiast",
    author: "Haemin Ryu",
    twitterUsername: "haeminryu_",
    facebookUsername: "haemin.ryu",
    instagramUsername: "goals._.mong",
    linkedinUsername: "in/haeminryu",
    image: "/macbook-color.jpg",
    siteUrl: "https://haeminryu.design",
    developerName: "Morgan Baker Development",
    developerUrl: "https://www.morganbaker.dev",
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: "c1yjofbf6kyw",
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: "CFPAT-memZXUYbepr3fEcWnw-1X_kJv3Zs3S1_TKy4L8JSviU",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://barcadia.netlify.com",
        sitemap: "https://barcadia.netlify.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`
  ],
}
