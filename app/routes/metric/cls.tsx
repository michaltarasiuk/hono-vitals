import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { ClsObserver } from "@/app/islands/metric/cls";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { ClsFlagsSchema } from "@/lib/metric/flags/cls";

export default createMetricRoute({
  metric: "CLS",
  schema: ClsFlagsSchema,
  observer: ClsObserver,
  children: (flags) => (
    <>
      <Heading {...elementTiming("main-heading")}>CLS Test</Heading>
      {flags.noLayoutShifts ? (
        <Text>This text does not shift.</Text>
      ) : (
        <>
          <Text>
            <img
              src="/public/square.png?delay=500"
              alt="Gray square"
              hidden={flags.imgHidden}
              {...elementTiming("main-image")}
            />
            [text node contents]
          </Text>
          <Text data-target="secondary-image-wrapper">
            <img
              src="/public/square.png?delay=1000"
              alt="Gray square"
              hidden={flags.img2Hidden}
              {...elementTiming("secondary-image")}
            />
          </Text>
          <Text>Text below the images that will get pushed down.</Text>
        </>
      )}
    </>
  ),
});
