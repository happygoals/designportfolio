import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import SimpleBanner from "../components/SimpleBanner/SimpleBanner"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => <span>{children}</span>
const Text = ({ children }) => <p>{children}</p>;

const RICHTEXT_OPTIONS = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode:{
    [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
    "embedded-asset-block": node => {
   //   const { gatsbyImageDataURL } = node.data.target.gatsbyImageData.images.fallback.src;
      console.log(node.data.target.gatsbyImageData
        );
      if (node.data.target.gatsbyImageData == null) {
        // asset is not an image
        return null
      }
      else{
            return <img 
            src={node.data.target.gatsbyImageData.images.fallback.src}
            width={node.data.target.gatsbyImageData.width/2}
            height={node.data.target.gatsbyImageData.height/2}
        />
      }
      //  return <GatsbyImage image={getImage(gatsbyImageDataURL)} />
    },
    [INLINES.HYPERLINK]: (node) => {
        if (node.data.uri.includes("https://www.youtube.com/watch")) {
          const videoId = node.data.uri.split("watch?v=").pop();
          return (
            <div className="embed-video">
              <iframe
                width="350"
                height="250"
                // src="https://www.youtube.com/embed/Nvamav9N86w"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
        console.log(node);
        return <a href={node.data.uri}>{node.content[0].value}</a>;
      }
    //   ,
    // [INLINES.HYPERLINK]: (node, children) => {
    //   return <a href={node.data.uri}>{children}</a>
    // }
  },
  renderText: text =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text])
}


const DefaultTemplate = contentfulPage => {
  const headerImage = getImage(contentfulPage.headerImage)
  return (
    <>
      <Seo title={contentfulPage.title} />
      <Layout>
        <SimpleBanner title={contentfulPage.title}>
          <GatsbyImage className="banner__image" image={headerImage} />
        </SimpleBanner>
        <div className="section">
          <div className="container container__tight">
            {contentfulPage.mainContent && renderRichText(contentfulPage.mainContent, RICHTEXT_OPTIONS)}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DefaultTemplate