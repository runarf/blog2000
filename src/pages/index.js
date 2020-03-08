import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { groupBy } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Awesome from "@fortawesome/free-brands-svg-icons"

const BlogIndex = ({ data }) => {
  const { edges: posts } = data.allMdx
  const { edges: mdPosts } = data.allMarkdownRemark
  console.log("mdPosts", mdPosts)
  const allPosts = [...posts, ...mdPosts]

  const groupedPosts = groupBy(
    allPosts,
    ({ node: post }) => post.frontmatter.type
  )

  return (
    <div>
      <Header />

      <Contents groupedPosts={groupedPosts} />
    </div>
  )
}

const Header = () => (
  <div
    css={css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    `}
  >
    <div></div>
    <h1
      css={css`
        justify-self: center;
      `}
    >
      Runars homepage
    </h1>
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      `}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/runarf/"
      >
        <FontAwesomeIcon icon={Awesome.faLinkedin} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/Runfl"
      >
        <FontAwesomeIcon icon={Awesome.faTwitter} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/runarf?tab=repositories"
      >
        <FontAwesomeIcon icon={Awesome.faGithub} />
      </a>
    </div>
  </div>
)

const Contents = ({ groupedPosts }) => (
  <div
    css={css`
      display: grid;
      grid-template-columns: 1fr 1fr;
    `}
  >
    <Content
      posts={[...groupedPosts["blog"], ...groupedPosts["personal"]]}
      title="Blog"
    />

    <Content posts={groupedPosts["project"]} title="Projects" />
  </div>
)

const Content = ({ posts, title }) => (
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
      {title}
    </h2>
    {posts.map(({ node: post }) => (
      <div key={post.id}>
        <Link to={post.fields.slug}>
          <h2>{post.frontmatter.title}</h2>
        </Link>
        <p>{post.excerpt}</p>
      </div>
    ))}
  </div>
)

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
