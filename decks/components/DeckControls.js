import React, {
  useEffect,
  useState
} from "react";
import { useDeck } from "mdx-deck";
import { navigate } from "gatsby";

export default function DeckControls({
  children,
  durration = 5000
}) {
  const state = useDeck();
  const [shouldLoop, setShouldLoop] = useState(
    false
  );
  function handleShouldLoop(event) {
    console.log("HANDLING LOOP SEQUENCE");
    console.log("EVENT!", event);
    setShouldLoop(event.detail);
  }

  useEffect(() => {
    console.log("SETTING UP LOOP SEQUENCE");
    window.document.addEventListener(
      "shouldLoop",
      handleShouldLoop,
      false
    );
    return () =>
      window.document.removeEventListener(
        "shouldLoop",
        handleShouldLoop,
        false
      );
  }, [shouldLoop]);

  useEffect(() => {
    console.log("SETTING UP NEXT");
    window.document.addEventListener(
      "nextSlide",
      next,
      false
    );
    return () =>
      window.document.removeEventListener(
        "nextSlide",
        next,
        false
      );
  }, []);

  useEffect(() => {
    try {
      const event = new CustomEvent("deckState", {
        detail: state
      });
      window.parent.document.dispatchEvent(event);
    } catch (err) {
      console.log("ummm", err);
    }
  });

  function next() {
    console.log("NEXTING");
    if (
      state.steps > 0 &&
      state.step < state.steps
    ) {
      console.log("NEXTING 1");
      state.setState({ step: state.step + 1 });
    } else if (state.index < state.length - 1) {
      console.log("NEXTING 2");
      console.log(":P");
      const n = state.index + 1;
      navigate([state.slug, n].join("/"));
      state.setState({ step: 0, index: n });
    } else {
      console.log("NEXTING 3");
      // NO LOOPING
      // const n = 0
      // navigate([state.slug, n].join("/"))
      // state.setState({ step: 0, index: n })
      try {
        const event = new CustomEvent("nextDeck");
        window.parent.document.dispatchEvent(
          event
        );
      } catch (err) {
        console.log("ummm", err);
      }
    }
  }

  useEffect(() => {
    if (!shouldLoop) {
      return;
    }
    const timeout = setTimeout(() => {
      next();
    }, durration);
    return () => clearTimeout(timeout);
  }, [
    state.step,
    state.steps,
    state.index,
    durration,
    shouldLoop
  ]);

  return <div>{children}</div>;
}
