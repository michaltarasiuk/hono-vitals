export const INP_BLOCKING_EVENT_NAMES = [
  'mousedown',
  'mouseup',
  'pointerdown',
  'pointerup',
  'keydown',
  'keyup',
  'click',
] as const;

export type InpBlockingEventName = (typeof INP_BLOCKING_EVENT_NAMES)[number];

const blockingTimes = new Map<InpBlockingEventName, number>();

function block(e: Event) {
  const ms = blockingTimes.get(e.type as InpBlockingEventName) ?? 0;
  if (ms <= 0) {
    return;
  }
  const end = performance.now() + ms;
  while (performance.now() < end);
}

export function setBlockingTime(
  eventName: InpBlockingEventName,
  value: number,
) {
  const bt = blockingTimes.get(eventName) ?? 0;
  blockingTimes.set(eventName, value);

  if (value > 0 && bt <= 0) {
    addEventListener(eventName, block, true);
  } else if (value <= 0 && bt > 0) {
    removeEventListener(eventName, block, true);
  }
}

export function resetBlockingTimes() {
  for (const en of INP_BLOCKING_EVENT_NAMES) {
    setBlockingTime(en, 0);
  }
}
