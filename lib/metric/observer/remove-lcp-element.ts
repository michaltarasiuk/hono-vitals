import {yieldToEventLoop} from '@/lib/delay';
import {afterElementsRendered} from '@/lib/metric/observer/ready';

export async function removeLcpElement() {
  await afterElementsRendered();
  await yieldToEventLoop();
  document.getElementById('lcp-image')?.remove();
}
