import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from 'gatsby'
import CodeBlock from "../components/CodeBlock"

const shortcodes = { Link, CodeBlock }

const PageTemplate = ({ data: { mdx } }) => {

  return (
    <div>
      <h1>{mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  )
}
export default PageTemplate

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`