import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div>
            <div>
              Written by <strong>{author}</strong> who lives and works Dublin as
              a Java Techincal Lead.
            </div>
            <div className='social-section'>
              <div>
                {' '}
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  style={{ boxShadow: `none`, marginRight: 10 }}
                >
                  <Image
                    fixed={data.twitterIcon.childImageSharp.fixed}
                    alt={author}
                    style={{
                      marginBottom: 0,
                      marginRight: 5,
                      minWidth: 20,
                      borderRadius: `100%`,
                    }}
                  />
                  <span style={{ verticalAlign: 'super' }}>david_kerwick</span>
                </a>
              </div>
              <div className='center'>
                <a
                  href={`https://twitter.com/${social.github}`}
                  style={{ boxShadow: `none` }}
                >
                  <Image
                    fixed={data.githubIcon.childImageSharp.fixed}
                    alt={author}
                    style={{
                      marginBottom: 0,
                      marginRight: 5,
                      minWidth: 20,
                      borderRadius: `100%`,
                    }}
                  />
                  <span style={{ verticalAlign: 'super' }}>david-kerwick</span>
                </a>
              </div>
              <div className='right'>
                <a
                  href={`https://twitter.com/${social.github}`}
                  style={{ boxShadow: `none` }}
                >
                  <Image
                    fixed={data.emailIcon.childImageSharp.fixed}
                    alt={author}
                    style={{
                      marginBottom: 0,
                      marginRight: 5,
                      minWidth: 20,
                      borderRadius: `100%`,
                    }}
                  />
                  <span style={{ verticalAlign: 'super' }}>david-kerwick</span>
                </a>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    twitterIcon: file(
      absolutePath: { regex: "/assets/Twitter_Social_Icon_Circle_Color.png/" }
    ) {
      childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    githubIcon: file(absolutePath: { regex: "/assets/GitHub-Mark-32px.png/" }) {
      childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    emailIcon: file(absolutePath: { regex: "/assets/email-10-32.png/" }) {
      childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Bio
