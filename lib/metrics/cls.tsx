import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { ClsObserver } from "@/app/islands/metric/cls-observer";
import { defineMetric } from "@/lib/metric/define-metric";
import { CLS_FLAGS_DEFAULTS, type ClsFlags } from "@/lib/metric/flags/cls";

function ClsContent({ flags }: { flags: ClsFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">CLS Test</Heading>
      {flags.noLayoutShifts ? (
        <Text>This text does not shift.</Text>
      ) : (
        <>
          <Text>
            <img
              src="/public/square.png?delay=500"
              alt="Gray square"
              elementtiming="main-image"
              hidden={flags.imgHidden}
            />
            [text node contents]
          </Text>
          <Text data-target="secondary-image-wrapper">
            <img
              src="/public/square.png?delay=1000"
              alt="Gray square"
              elementtiming="secondary-image"
              hidden={flags.img2Hidden}
            />
          </Text>
          <Text>Text below the images that will get pushed down.</Text>
        </>
      )}
    </>
  );
}

export default defineMetric({
  name: "CLS",
  defaults: CLS_FLAGS_DEFAULTS,
  Observer: ClsObserver,
  Content: ClsContent,
});
