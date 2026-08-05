import { SquareImage } from "@/app/components/metric/square-image";
import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { ClsObserver } from "@/app/islands/observers/cls-observer";
import { defineMetric } from "@/lib/metric/define-metric";
import {
  CLS_FLAGS_DEFAULTS,
  type ClsFlags,
} from "@/lib/metric/flags/defaults/cls";

function ClsContent({ flags }: { flags: ClsFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">CLS Test</Heading>
      {flags.noLayoutShifts ? (
        <Text>This text does not shift.</Text>
      ) : (
        <>
          <Text>
            <SquareImage
              elementtiming="main-image"
              delay={500}
              hidden={flags.imgHidden}
            />{" "}
            [text node contents]
          </Text>
          <Text data-target="secondary-image-wrapper">
            <SquareImage
              elementtiming="secondary-image"
              delay={1000}
              hidden={flags.imgHidden2}
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
