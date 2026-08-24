import {toInlineScript} from '@/lib/to-inline-script';

function applyWasDiscardedStub() {
  if (!document.wasDiscarded) {
    Object.defineProperty(document, 'wasDiscarded', {
      value: true,
      configurable: true,
    });
  }
}

export const WAS_DISCARDED_STUB_SCRIPT = toInlineScript(applyWasDiscardedStub);
