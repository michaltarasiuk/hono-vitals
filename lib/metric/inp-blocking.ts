export const EVENT_NAMES = [
  "mousedown",
  "mouseup",
  "pointerdown",
  "pointerup",
  "keydown",
  "keyup",
  "click",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const blockingTimes = new Map<EventName, number>();

function block(event: Event) {
  const blockingTime = blockingTimes.get(event.type as EventName) ?? 0;
  if (blockingTime <= 0) {
    return;
  }
  const startTime = performance.now();
  while (performance.now() < startTime + blockingTime) {
    // Block
  }
}

export function setBlockingTime(eventName: EventName, value: number) {
  const previous = blockingTimes.get(eventName) ?? 0;
  blockingTimes.set(eventName, value);

  if (value > 0 && previous <= 0) {
    window.addEventListener(eventName, block, true);
  } else if (value <= 0 && previous > 0) {
    window.removeEventListener(eventName, block, true);
  }
}

export function resetBlockingTimes() {
  for (const eventName of EVENT_NAMES) {
    setBlockingTime(eventName, 0);
  }
}
