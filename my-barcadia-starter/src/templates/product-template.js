import React from "react"
import Seo from "../components/SEO"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import styled from "styled-components"
import BannerModule from "../components/BannerModule/BannerModule"
import Faq from "../components/Faq/Faq"
import Features from "../components/Features/Features"
import { BLOCKS, INLINES } from "@contentful/rich-text-types";


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

const Producttemplate = (contentfulProduct) => {
  const {
    headerImage,
    title,
    price,
    date,
    dateEnd,
    introduction,
    description,
    singleimage,
    richDescription,
    faqs,
    gallery,
  } = contentfulProduct
  const productHeaderImage = getImage(headerImage)
  const productSingleImage = getImage(singleimage)
  
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
              {description && (
                <div>{renderRichText(description)}</div>
              )}
          </div>
        <div className="container container__tight">
          {richDescription && (
              <div className="column">{renderRichText(richDescription)}</div>
            )}
        </div>
      </ProductTemplateStyles>
      <GatsbyImage
          className="banner__image_single"
          image={productSingleImage}
          alt={title}
          style={{ marginLeft: "100px", marginRight: "100px" }}
        />
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
        introduction="Haemin is interested in Interactive Tools, Accessability, and Healthcare."
      />
    </>
  )
}

export default Producttemplate
