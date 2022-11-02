'use client';

import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

export const initDatadog = (env: string, version: string) => () => {
  datadogLogs.init({
    forwardConsoleLogs: 'all',
    clientToken: 'pubacc78941d502a5cc9db4959f79981659',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    version,
    env,
    service: 'initist',
  });

  datadogRum.init({
    applicationId: 'db43487c-870b-4894-a5f5-8fc6c49427cf',
    clientToken: 'pubacc78941d502a5cc9db4959f79981659',
    site: 'datadoghq.com',
    service: 'initist',
    env,
    version,
    sampleRate: 100,
    sessionReplaySampleRate: 20,
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });

  datadogRum.startSessionReplayRecording();

  datadogLogs.logger.debug('Start up Datadog');
};
