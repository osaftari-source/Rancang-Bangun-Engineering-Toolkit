/* About page support — Rancang Bangun Engineering Toolkit Hub v1.1 */
(() => {
  "use strict";
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js?v=1.1.0", { updateViaCache: "none" }).catch(() => {});
  }
})();
