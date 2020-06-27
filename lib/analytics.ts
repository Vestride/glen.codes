// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
export const GA_TRACKING_ID = 'UA-62748172-1';

export function sendPageview() {
  window.ga('send', 'pageview');
}
