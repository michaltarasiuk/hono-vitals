export const EVENT_NAMES = [
  "mousedown",
  "mouseup",
  "pointerdown",
  "pointerup",
  "keydown",
  "keyup",
  "click",
] as const;

function block(event: Event) {
  const input = document.getElementById(`${event.type}-blocking-time`);
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  const blockingTime = Number(input.value);
  const startTime = performance.now();
  while (performance.now() < startTime + blockingTime) {
    // Block
  }
}

function onInput(event: Event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  const eventName = input.id.slice(0, input.id.indexOf("-"));
  if (Number(input.value) > 0) {
    window.addEventListener(eventName, block, true);
  } else {
    window.removeEventListener(eventName, block, true);
  }
}

export function addBlockingListeners() {
  for (const eventName of EVENT_NAMES) {
    const input = document.getElementById(`${eventName}-blocking-time`);
    if (!(input instanceof HTMLInputElement)) {
      continue;
    }
    input.addEventListener("input", onInput, true);
    if (Number(input.value) > 0) {
      window.addEventListener(eventName, block, true);
    }
  }
}

export function resetBlockingTimes() {
  for (const input of document.querySelectorAll("label>input")) {
    if (input instanceof HTMLInputElement) {
      input.value = "0";
    }
  }
}
