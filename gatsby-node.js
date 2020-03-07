/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const mdPages = await getMdPages(graphql)

  mdPages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  const mdxPages = await getMdxPages(graphql, reporter)

  mdxPages.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/posts-page-layout.js`),
      context: { id: node.id },
    })
  })
}

async function getMdxPages(graphql, reporter) {
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error: Loading createpages query`)
  }

  return result.data.allMdx.edges
}

const getMdPages = async (createPage, graphql) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return result.data.allMarkdownRemark.edges
}
