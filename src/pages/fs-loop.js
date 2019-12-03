import React, {
  useState,
  useEffect,
  useRef
} from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const decks = [
  {
    name: "Intro",
    url: "intro"
  },
  {
    name: "HTML",
    url: "html"
  },
  {
    name: "CSS",
    url: "css"
  }
  // {
  //   name: "JS",
  //   url: "js"
  // },
  // {
  //   name: "Functions",
  //   url: "functions"
  // },
  // {
  //   name: "Variables",
  //   url: "variables"
  // },
  // {
  //   name: "Conditionals",
  //   url: "conditionals"
  // },
  // {
  //   name: "Loops",
  //   url: "loops"
  // }
];

const IndexPage = props => {
  const iframeEl = useRef(null);
  console.log(
    "PROPS LOCATION SEARCH: ",
    props.location.search
  );
  const [shouldLoop, setShouldLoop] = useState(
    true
  );
  const [
    isFullScreen,
    setIsFullScreen
  ] = useState(true);
  const [deck, setDeck] = useState(0);
  const [deckState, setDeckState] = useState({
    index: 0,
    length: 1
  });

  function handleDeckState(e) {
    setDeckState(e.detail);
  }

  function handleNextDeck(e) {
    let deckIndex = deck + 1;
    if (deckIndex >= decks.length) {
      deckIndex = 0;
    }
    setDeck(deckIndex);
  }

  useEffect(() => {
    window.document.addEventListener(
      "deckState",
      handleDeckState,
      false
    );
    return () =>
      window.document.removeEventListener(
        "deckState",
        handleDeckState,
        false
      );
  }, [deck]);

  useEffect(() => {
    window.document.addEventListener(
      "nextDeck",
      handleNextDeck,
      false
    );
    return () =>
      window.document.removeEventListener(
        "nextDeck",
        handleNextDeck,
        false
      );
  }, [deck]);

  useEffect(() => {
    console.log(
      "EMITTING LOOP SEQUENCE",
      iframeEl.current,
      deckState
    );
    if (!iframeEl.current) {
      return;
    }
    console.log("EMITTING LOOP SEQUENCE 2");
    const event = new CustomEvent("shouldLoop", {
      detail: shouldLoop
    });
    console.log("EMITTING LOOP SEQUENCE 3");
    iframeEl.current.contentDocument.dispatchEvent(
      event
    );
    console.log("EMITTING LOOP SEQUENCE 4");
  }, [iframeEl, shouldLoop, deckState]);

  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>learn to code</h1> */}
      {/* <div style={{ flex: "0 0 100%" }}>
          <input
            type="checkbox"
            checked={shouldLoop}
            onChange={() => {
              setShouldLoop(!shouldLoop);
            }}
          />
          Should loop? {shouldLoop ? "yes" : "no"}
        </div> */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 0 0 160px;
            align-items: flex-start;
            /* justify-content: center; */
            height: calc(100% - 120px);
          `}
        >
          {decks.map((d, i) => (
            <button
              css={css`
                background-color: rebeccapurple;
                border: none;
                font-size: 12px;
                letter-spacing: 2px;
                /* text-transform: uppercase; */

                cursor: pointer;
                padding: 2px 16px;
                margin: 6px 0;
                border-left: ${decks[deck]
                  .name === d.name
                  ? "2px solid white"
                  : "none"};
                color: ${decks[deck].name ===
                d.name
                  ? "white"
                  : "rgba(250, 250, 250, 0.6)"};

                &:hover {
                  color: white;
                }
              `}
              key={i}
              onClick={() => setDeck(i)}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1 1 100px;
            align-items: center;
            justify-content: center;
            height: calc(100% - 120px);
          `}
        >
          <div
            css={css`
              width: 100%;
              /* padding-top: 56.25%; */
              /* height: 0; */
              height: 100%;
              overflow: hidden;
              position: relative;
              background: #011627;
              box-shadow: 0px 0px 30px 2px
                  rgba(10, 10, 10, 0.4),
                0px 0px 22px -4px rgba(10, 10, 10, 0.7);
            `}
          >
            {/* <div
              css={css`
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 100px;
              `}
            >
              CQ
            </div> */}
            <iframe
              ref={iframeEl}
              title={decks[deck].name}
              src={`/decks/${decks[deck].url}`}
              frameBorder="0"
              scrolling="no"
              css={css`
                top: 0;
                left: 0;
                background-color: #011627;
                position: fixed;
                width: 100vw;
                height: 100vh;
              `}
            />
          </div>
          {/* <div>
            slide: {deckState.index + 1} /{" "}
            {deckState.length}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
