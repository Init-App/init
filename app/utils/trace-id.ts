import hyperid from 'hyperid';

const instance = hyperid({ urlSafe: true });
export const traceId = instance();
