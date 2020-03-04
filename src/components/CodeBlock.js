import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import kotlinLang from "refractor/lang/kotlin"
import dockerLang from "refractor/lang/docker"
import nginxLang from "refractor/lang/nginx"
import Prism from "prism-react-renderer/prism"
import theme from "prism-react-renderer/themes/github"
import { css } from "@emotion/core"

kotlinLang(Prism)
dockerLang(Prism)
nginxLang(Prism)

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : ""

  return (
    <Highlight
      Prism={Prism}
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          <span css={css`background-color: pink`}>{language}</span>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
