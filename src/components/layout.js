/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/core";

import Header from "./header";
import "typeface-rubik";
import "./layout.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      css={css`
        display: flex;
        align-items: stretch;
        height: 100vh;
      `}
    >
      <Header
        siteTitle={data.site.siteMetadata.title}
      />
      <main
        css={css`
          width: 100%;
          background-color: rebeccapurple;
          color: white;
          padding-left: 20px;
        `}
      >
        {children}
      </main>
      <footer
        css={css`
          left: 68px;
          position: fixed;
          bottom: 0;
          color: white;
        `}
      >
        © {new Date().getFullYear()} Code Quests
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
