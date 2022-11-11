import 'app/utils/sentry.client.config';

export default function Head() {
  return (
    <>
      <script
        key="stloader"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    (function(e,r,n,t,s){var a=[];e[s]=function(){a.push(arguments)};e[s].queue=a;  var o=[];var i=[];var c=true;var p=void 0;if(window.PerformanceObserver&&  window.PerformanceObserver.supportedEntryTypes&&(  PerformanceObserver.supportedEntryTypes.indexOf("longtask")>=0||  PerformanceObserver.supportedEntryTypes.indexOf("element")>=0)){  p=new PerformanceObserver(function(e){e.getEntries().forEach(function(e){  switch(e.entryType){case"element":i.push(e);break;case"longtask":o.push(e);break;  default:break}})});p.observe({entryTypes:["longtask","element"]})}e[s+"lt"]={  longTasks:o,timingElements:i,inPageLoad:c,observer:p};if(t){var u=r.createElement(n);  u.async=1;u.src=t;var f=r.getElementsByTagName(n)[0];f.parentNode.insertBefore(u,f)}})
    (window,document,"script","//cdn.sematext.com/experience.js","strum");
  `,
        }}
      />
      <script
        key="stconfig"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    strum('config', { token: '77e7d6a1-d75e-45e6-8527-0b01c7a1155c', 'receiverUrl': 'https://rum-receiver.sematext.com' });
    var oldPushState = history.pushState;
    history.pushState = function(state, title, url) {
      window['strum']('routeChange', url);
      return oldPushState.apply(history, arguments);
    };
 `,
        }}
      />
    </>
  );
}
