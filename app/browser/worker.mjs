/* global self */
const CREATE = "create";
const UPDATE = "update";
const DESTROY = "destroy";
const LIST = "list";

self.onmessage = stateMachine;

async function stateMachine({ data }) {
  const { data: payload, type } = data;
  switch (type) {
    case CREATE:
      try {
        const response = await fetch("/search", {
          body: payload,
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const result = await response.json();
        self.postMessage({
          type: CREATE,
          result,
        });
      } catch (err) {
        // RESPOND WITH ERROR
        console.error(err);
      }
      break;
  }
}
