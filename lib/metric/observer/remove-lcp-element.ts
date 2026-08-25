import {afterElementsRendered} from '@/lib/metric/observer/wait-for';
import {yieldToEventLoop} from '@/lib/utils/delay';

export async function removeLcpElement() {
  await afterElementsRendered();
  await yieldToEventLoop();
  document.getElementById('lcp-image')?.remove();
}
