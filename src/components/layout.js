import React from "react"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "./CodeBlock"
const shortcodes = { CodeBlock }

export default ({ children }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
)
