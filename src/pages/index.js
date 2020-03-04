import React from 'react'
import { Link, graphql } from "gatsby"
import {css} from '@emotion/core'

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  const { edges: mdPosts } = data.allMarkdownRemark
  console.log("mdPosts", mdPosts)
  const allPosts = [...posts, ...mdPosts]

  return (
    <div css={css`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: flex-end;
    `}>
      <h1>Runars blog </h1>
        {allPosts.map(({ node: post }) => (
          <div key={post.id}>
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </div>
        ))}
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
        }
        fields {
          slug
        }
      }
    }
  }
}
`