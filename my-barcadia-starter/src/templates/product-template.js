import React from "react"
import Seo from "../components/SEO"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import styled from "styled-components"
import BannerModule from "../components/BannerModule/BannerModule"
import Faq from "../components/Faq/Faq"
import Features from "../components/Features/Features"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const ProductTemplateStyles = styled.div`

  .container {
    display: flex;
    flex-wrap: wrap;
    .column {
      flex: 0 0 100%;

      @media (min-width: 768px) {
        flex-basis: 50%;

        &:nth-child(1) {
          padding-right: 20px;
        }

        &:nth-child(2) {
          padding-left: 20px;
        }

        > * {
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      > * {
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
`

const ProductGallery = styled.section`
  width: 100%;

  > .container {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--gap) / 2);

    @media (min-width: 1024px) {
      gap: var(--gap);
    }

    > * {
      width: calc(50% - 10px);

      @media (min-width: 768px) {
        width: calc(33.333% - 14px);
      }

      @media (min-width: 1024px) {
        width: calc(25% - 30px);
      }
    }
  }
`
const Bold = ({ children }) => <span style={{fontWeight: "bold"}}>{children}</span>
const Text = ({ children }) => <p style={{whiteSpace: "pre-wrap"}}>{children}</p>;

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


const Producttemplate = (contentfulProduct) => {
  const {
    headerImage,
    title,
    price,
    date,
    dateEnd,
    introduction,
    // description,
    // singleimage,
    richDescription,
    faqs,
    gallery,
  } = contentfulProduct
  const productHeaderImage = getImage(headerImage)
  //const productSingleImage = getImage(singleimage)

  return (
    <>
      <Seo title={title} />
      <BannerModule
        title={title}
        price={price}
        subTitle={introduction}
        date={date}
        dateEnd={dateEnd}
      // enquire={true}
      >
        <GatsbyImage
          className="banner__image"
          image={productHeaderImage}
          alt={title}
        />
      </BannerModule>
      <ProductTemplateStyles className="section">
        <div className="container container__tight">
          {faqs && (
            <div>
              {faqs.map((item, index) => {
                return (
                  <Faq
                    key={index}
                    title={item.question}
                    description={item.answer}
                  />
                )
              })}
            </div>
          )}
          {/* {description && (
            <div>{renderRichText(description)}</div>
          )} */}
        </div>
        <div className="container container__tight">
        {/* {documentToReactComponents(RICHTEXT_OPTIONS)} */}
        {richDescription && renderRichText(richDescription, RICHTEXT_OPTIONS)}
        </div>
      </ProductTemplateStyles>
      {/* <GatsbyImage
        className="banner__image_single"
        image={productSingleImage}
        alt={title}
        style={{ marginLeft: "100px", marginRight: "100px" }}
      /> */}
      {gallery && (
        <ProductGallery className="section">
          <div className="container container__tight">
            {gallery.map((item, index) => {
              let galleyImage = getImage(item)
              return <GatsbyImage key={index} image={galleyImage} />
            })}
          </div>
        </ProductGallery>
      )}
      <Features
        title="Highlighted Projects"
        introduction="Haemin is interested in Creative Tools, Accessability, Healthcare, and Digital Products."
      />
    </>
  )
}

export default Producttemplate
