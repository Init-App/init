import { sentry } from 'app/utils/sentry.client.config';
import { traceId } from './utils/trace-id';
sentry.configureScope((scope) => {
  scope.setTag('trace_id', traceId);
});
export default function Head() {
  return (
    <>
      <title>Initist</title>
    </>
  );
}
