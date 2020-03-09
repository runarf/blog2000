import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import CodeBlock from "../components/CodeBlock"
import { css } from "@emotion/core"
const shortcodes = { Link, CodeBlock }

const PageTemplate = ({ data: { mdx } }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 200px;
      `}
    >
      <MDXProvider components={shortcodes}>
        <div>
          <h1>{mdx.frontmatter.title}</h1>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
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
