import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  console.log(data)
  return (
    <div>
      {data.allFile.edges.map(({ node }, index) => (
        <div key={index}>{JSON.stringify(node)}</div>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
