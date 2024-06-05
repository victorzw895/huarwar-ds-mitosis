import { For, createSignal, createMemo } from "solid-js";

import { css } from "solid-styled-components";

function TodoApp(props: any) {
  const [list, setList] = createSignal(["hello", "world"]);

  const [newItemName, setNewItemName] = createSignal("");

  function addItem() {
    if (!newItemName()) {
      return;
    }
    setList([...list(), newItemName()]);
  }

  function deleteItem(idx: number) {
    setList(list().filter((x, i) => i !== idx));
  }

  return (
    <div
      class={css({
        padding: "10px",
        maxWidth: "700px",
      })}
    >
      <span>TO-DO list:</span>
      <div
        class={css({
          display: "flex",
          width: "100%",
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
            flexGrow: "1",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          })}
          placeholder="Add a new item"
          value={newItemName()}
          onInput={(event) => setNewItemName(event.target.value)}
        />
        <button
          class={css({
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            borderRadius: "0.25rem",
            fontWeight: "700",
            color: "#ffffff",
            backgroundColor: "#3B82F6",
            cursor: "pointer",
          })}
          onClick={(event) => addItem()}
        >
          Add
        </button>
      </div>
      <div
        class={css({
          marginTop: "1rem",
        })}
      >
        <ul
          class={css({
            borderRadius: "0.25rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            margin: "unset",
            padding: "unset",
          })}
        >
          <For each={list()}>
            {(item, _index) => {
              const idx = _index();
              return (
                <li
                  class={css({
                    display: "flex",
                    padding: "0.625rem",
                    alignItems: "center",
                    borderBottomWidth: "1px",
                    borderColor: "#E5E7EB",
                    gap: "16px",
                  })}
                  key={idx}
                >
                  <span>{item}</span>
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
                      deleteItem(idx);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
