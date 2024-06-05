import {
  Show,
  For,
  on,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import { css } from "solid-styled-components";
export type Props = {
  getValues?: (input: string) => Promise<any[]>;
  renderChild?: any;
  transformData?: (item) => string;
};

function AutoComplete(props: Props) {
  const [showSuggestions, setShowSuggestions] = createSignal(false);

  const [suggestions, setSuggestions] = createSignal([]);

  const [inputVal, setInputVal] = createSignal("");

  function setInputValue(value: string) {
    setInputVal(value);
  }

  function handleClick(item) {
    setInputValue(transform(item));
    setShowSuggestions(false);
  }

  function fetchVals(city: string) {
    if (props.getValues) {
      return props.getValues(city);
    }
    return fetch(
      `http://universities.hipolabs.com/search?name=${city}&country=united+states`
    ).then((x) => x.json());
  }

  function transform(x) {
    return props.transformData ? props.transformData(x) : x.name;
  }

  const onUpdateFn_0_inputVal__ = createMemo(() => inputVal());
  const onUpdateFn_0_props_getValues = createMemo(() => props.getValues);
  function onUpdateFn_0() {
    fetchVals(inputVal()).then((newVals) => {
      if (!newVals?.filter) {
        console.error("Invalid response from getValues:", newVals);
        return;
      }
      setSuggestions(
        newVals.filter((data) =>
          transform(data).toLowerCase().includes(inputVal().toLowerCase())
        )
      );
    });
  }
  createEffect(
    on(
      () => [onUpdateFn_0_inputVal__(), onUpdateFn_0_props_getValues()],
      onUpdateFn_0
    )
  );

  return (
    <div
      class={css({
        padding: "10px",
        maxWidth: "700px",
      })}
    >
      Autocomplete:
      <div
        class={css({
          position: "relative",
          display: "flex",
          gap: "16px",
          alignItems: "stretch",
        })}
      >
        <input
          class={css({
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            borderRadius: "0.25rem",
            borderWidth: "1px",
            borderColor: "#000000",
            width: "100%",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          })}
          placeholder="Search for a U.S. university"
          value={inputVal()}
          onInput={(event) => setInputVal(event.target.value)}
          onFocus={(event) => setShowSuggestions(true)}
        />
        <button
          class={css({
            cursor: "pointer",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            borderRadius: "0.25rem",
            color: "#ffffff",
            backgroundColor: "#EF4444",
          })}
          onClick={(event) => {
            setInputVal("");
            setShowSuggestions(false);
          }}
        >
          X
        </button>
      </div>
      <Show when={suggestions().length > 0 && showSuggestions()}>
        <ul
          class={css({
            borderRadius: "0.25rem",
            height: "10rem",
            margin: "unset",
            padding: "unset",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          })}
        >
          <For each={suggestions()}>
            {(item, _index) => {
              const idx = _index();
              return (
                <li
                  class={css({
                    display: "flex",
                    padding: "0.5rem",
                    alignItems: "center",
                    borderBottomWidth: "1px",
                    borderColor: "#E5E7EB",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#F3F4F6",
                    },
                  })}
                  key={idx}
                  onClick={(event) => handleClick(item)}
                >
                  <Show
                    fallback={<span>{transform(item)}</span>}
                    when={props.renderChild}
                  >
                    <Dynamic
                      item={item}
                      component={props.renderChild}
                    ></Dynamic>
                  </Show>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export default AutoComplete;
