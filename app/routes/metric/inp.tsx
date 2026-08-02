import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { InpBlockingControls } from "@/app/islands/metric/inp-blocking-controls";
import { InpObserver } from "@/app/islands/metric/inp-observer";
import { LOREM_IPSUM } from "@/lib/lorem-ipsum";
import { defineMetric } from "@/lib/metric/define-metric";
import {
  INP_FLAGS_DEFAULTS,
  type InpFlags,
} from "@/lib/metric/flags/defaults/inp";

function InpContent({ flags }: { flags: InpFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">INP Test</Heading>
      <Text>{LOREM_IPSUM}</Text>
      <InpBlockingControls flags={flags} />
    </>
  );
}

export default defineMetric({
  name: "INP",
  defaults: INP_FLAGS_DEFAULTS,
  Observer: InpObserver,
  Content: InpContent,
});
