import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { InpObserver } from "@/app/islands/metric/inp";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { INP_FLAGS_DEFAULTS } from "@/lib/metric/flags/inp";

export default createMetricRoute({
  metric: "INP",
  defaults: INP_FLAGS_DEFAULTS,
  observer: InpObserver,
  children: () => (
    <>
      <Heading {...elementTiming("main-heading")}>INP Test</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec porta
        orci, ac sagittis augue. Nullam orci tellus, suscipit sed magna id,
        mattis iaculis ex. Etiam felis lectus, accumsan eu magna lacinia,
        lobortis tempus lacus. Donec nulla metus, blandit eget ullamcorper in,
        placerat eu massa. Curabitur vitae elementum orci, ac tincidunt neque.
        Maecenas accumsan odio sit amet arcu elementum, non vestibulum enim
        finibus. Phasellus malesuada lacinia suscipit. Cras ac gravida urna. In
        et mauris non tellus pretium ultrices. Fusce mattis a risus at
        tincidunt. Donec ac fringilla magna, nec suscipit lectus. Sed risus
        massa, rutrum ut leo quis, tempor dapibus dui. Proin in mauris non risus
        maximus tincidunt quis a mauris.
      </Text>
    </>
  ),
});
