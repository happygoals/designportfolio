import { graphql, useStaticQuery } from "gatsby"

const useAllProduct = () => {
  const {
    allContentfulProduct: { nodes },
  } = useStaticQuery(graphql`
    query allProductLinksQuery {
      allContentfulProduct(sort: { fields: createdAt, order: DESC }) {
        nodes {
          title
          gatsbyPath(filePath: "/products/{contentfulProduct.sku}")
          introduction
          sku
          price
          date(formatString: "MMMM, YYYY")
          dateEnd(formatString: "MMMM, YYYY")
          description {
            raw
          }
          richDescription {
            raw
          }
          headerImage {
            gatsbyImageData(
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          singleimage {
            gatsbyImageData(
              width: 700
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)

  return nodes
}

export default useAllProduct
