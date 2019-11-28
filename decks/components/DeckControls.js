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
    try {
      const event = new CustomEvent("deckState", {
        detail: state
      });
      window.parent.document.dispatchEvent(event);
    } catch (err) {
      console.log("ummm", err);
    }
  });

  useEffect(() => {
    if (!shouldLoop) {
      return;
    }
    const timeout = setTimeout(() => {
      if (
        (state.step === 0 && !state.steps) ||
        state.step < state.steps
      ) {
        state.setState({ step: state.step + 1 });
      } else if (state.index < state.length - 1) {
        console.log(":P");
        const n = state.index + 1;
        navigate([state.slug, n].join("/"));
        state.setState({ step: 0, index: n });
      } else {
        // NO LOOPING
        // const n = 0
        // navigate([state.slug, n].join("/"))
        // state.setState({ step: 0, index: n })
        try {
          const event = new CustomEvent(
            "nextDeck"
          );
          window.parent.document.dispatchEvent(
            event
          );
        } catch (err) {
          console.log("ummm", err);
        }
      }
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
