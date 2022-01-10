import React from "react"
import { graphql } from "gatsby"
import ProductTemplate from "../../templates/product-template"
import Seo from "../../components/SEO"
import Layout from "../../components/Layout"

const Product = ({ data: { contentfulProduct } }) => {
  return (
    <>
      <Seo title={contentfulProduct.title} />
      <Layout>
        <ProductTemplate {...contentfulProduct} />
      </Layout>
    </>
  )
}

export const data = graphql`
  query productQuery($id: String) {
    contentfulProduct(id: { eq: $id }) {
      title
      introduction
      price
      date
      headerImage {
        gatsbyImageData(
          width: 2000
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      description {
        raw
      }
      richDescription {
        raw
      }
      singleimage {
        gatsbyImageData(
          width: 500
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
      faqs {
        question
        answer {
          raw
        }
      }
      gallery {
        gatsbyImageData(
          width: 1500
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export default Product
