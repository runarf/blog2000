import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { groupBy } from "lodash"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  const { edges: mdPosts } = data.allMarkdownRemark
  console.log("mdPosts", mdPosts)
  const allPosts = [...posts, ...mdPosts]

  const groupedPosts = groupBy(
    allPosts,
    ({ node: post }) => post.frontmatter.type
  )
  // {allPosts.map(({ node: post }) => (
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <h1>Runars homepage </h1>
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <h2
            css={css`
              align-self: center;
            `}
          >
            Blog
          </h2>
          {groupedPosts["personal"].map(({ node: post }) => (
            <div key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p>{post.excerpt}</p>
            </div>
          ))}
          {groupedPosts["blog"].map(({ node: post }) => (
            <div key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <h2
            css={css`
              align-self: center;
            `}
          >
            Projects
          </h2>
          {groupedPosts["project"].map(({ node: post }) => (
            <div key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            type
          }
          fields {
            slug
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            type
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
