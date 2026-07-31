export type ObserverInstance = 1 | 2;

type ObserverOption =
  "durationThreshold" | "generateTarget" | "includeProcessedEventEntries";

export const OBSERVER_RECIPES = {
  cls: ["generateTarget"],
  fcp: [],
  inp: ["generateTarget", "durationThreshold", "includeProcessedEventEntries"],
  lcp: ["generateTarget"],
  ttfb: [],
} as const satisfies Record<string, readonly ObserverOption[]>;

interface ObserverFlagsInput {
  reportAllChanges: boolean;
  reportAllChanges2: boolean;
  generateTarget?: boolean;
  generateTarget2?: boolean;
  durationThreshold?: number;
  durationThreshold2?: number;
  includeProcessedEventEntries?: boolean;
}

export function buildObserverOptions(
  recipe: readonly ObserverOption[],
  flags: ObserverFlagsInput,
  instance: ObserverInstance = 1,
) {
  const options: Record<string, unknown> = {
    reportAllChanges: flags[instanceKey("reportAllChanges", instance)],
  };

  if (
    recipe.includes("generateTarget") &&
    flags[instanceKey("generateTarget", instance)]
  ) {
    options.generateTarget = generateTarget;
  }

  if (recipe.includes("durationThreshold")) {
    options.durationThreshold =
      flags[instanceKey("durationThreshold", instance)];
  }

  if (
    recipe.includes("includeProcessedEventEntries") &&
    flags.includeProcessedEventEntries
  ) {
    options.includeProcessedEventEntries = true;
  }

  return options;
}

function instanceKey<K extends string>(key: K, instance: ObserverInstance) {
  return (instance === 1 ? key : `${key}2`) as K | `${K}2`;
}

function generateTarget(node: Node | null) {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  return node.dataset.target;
}
