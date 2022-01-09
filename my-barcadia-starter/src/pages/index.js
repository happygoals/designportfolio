import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import BannerModule from "../components/BannerModule/BannerModule"
import BasicTextModule from "../components/BasicTextModule/BasicTextModule"
import PerksModule from "../components/PerksModule/PerksModule"
import Perk from "../components/PerksModule/Perk"
import Features from "../components/Features/Features"
import LatestPosts from "../components/Post/LatestPosts"

const Index = () => {
  return (
    <>
      <Seo title="Home" />
      <Layout>
        <BannerModule
          title="From computer science to design"
          subTitle="I create harmony between humans and products."
        />
        <Features
          title="Highlighted Projects"
          introduction="Haemin is interested in Accessability, Sustainability, and Virtual Reality."
        />
        {/* <BasicTextModule
          title="Hello. I'm Haemin Ryu, an HCI enthusiast living in Fort Wayne, IN, USA."
          content="People are the reason behind everything I do. 
          I love thinking about changes to make the user experience and human life better."
          link="/products"
          linkText="View Projects"
        /> */}
        {/* <PerksModule>
          <Perk title="The Title" content="The content" />
        </PerksModule> */}
        {/* <LatestPosts
          title="The Latest from Barcadia"
          introduction="Cras scelerisque, tellus sed gravida tincidunt, velit tellus blandit justo, nec viverra augue erat in erat. Maecenas iaculis sed purus non fringilla."
        /> */}
      </Layout>
    </>
  )
}

export default Index
