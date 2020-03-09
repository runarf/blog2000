import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { groupBy } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
import distorted from "./distorted.gif"

const BlogIndex = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const { edges: posts } = data.allMdx
  const { edges: mdPosts } = data.allMarkdownRemark

  useEffect(() => {
    const fakeLoading = async () => {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
    fakeLoading()
  })

  if (loading)
    return (
      <div
        css={css`
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src={distorted} />
      </div>
    )

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
      background-color: pink;
    `}
  >
    <div></div>
    <PageTitle />
    <SocialIcons />
  </div>
)

const PageTitle = () => (
  <h1
    css={css`
      justify-self: center;
    `}
  >
    Runars homepage
  </h1>
)

const SocialIcons = () => (
  <div
    css={css`
      display: flex;
      /* align-items: flex-end; */
      border: 1px dotted black;
    `}
  >
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/in/runarf/"
    >
      <FontAwesomeIcon icon={faLinkedin} />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/Runfl"
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/runarf?tab=repositories"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
  </div>
)

const Contents = ({ groupedPosts }) => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    `}
  >
    <Content
      css={css`
        background-color: beige;
      `}
      posts={[...groupedPosts["blog"], ...groupedPosts["personal"]]}
      title="Blog"
    />

    <Content
      css={css`
        background-color: lightgoldenrodyellow;
      `}
      posts={groupedPosts["project"]}
      title="Projects"
    />
  </div>
)

const Content = ({ posts, title, ...otherProps }) => (
  <div
    {...otherProps}
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
