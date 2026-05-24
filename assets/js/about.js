/* About & Status page support — Rancang Bangun Engineering Toolkit Hub v1.2 */
(() => {
  "use strict";
  const HUB_VERSION = "1.2.0";
  const statusToast = document.getElementById("status-toast");
  const updateToast = document.getElementById("update-toast");
  const checkButton = document.getElementById("check-update");
  let waitingWorker = null;

  function showStatus(message) {
    statusToast.textContent = message;
    statusToast.classList.remove("hidden");
    window.clearTimeout(showStatus.timer);
    showStatus.timer = window.setTimeout(() => statusToast.classList.add("hidden"), 3000);
  }
  function announceUpdate(worker) {
    waitingWorker = worker;
    updateToast.classList.remove("hidden");
  }
  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      checkButton.disabled = true;
      return;
    }
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=" + HUB_VERSION, { updateViaCache: "none" });
      if (registration.waiting && navigator.serviceWorker.controller) announceUpdate(registration.waiting);
      registration.addEventListener("updatefound", () => {
        const candidate = registration.installing;
        if (!candidate) return;
        candidate.addEventListener("statechange", () => {
          if (candidate.state === "installed" && navigator.serviceWorker.controller) announceUpdate(candidate);
        });
      });
      checkButton.addEventListener("click", async () => {
        checkButton.disabled = true;
        checkButton.textContent = "Checking…";
        try {
          await registration.update();
          if (!registration.waiting) showStatus("Toolkit Hub is up to date.");
        } catch (error) {
          showStatus("Unable to check updates. Check your connection.");
        } finally {
          checkButton.disabled = false;
          checkButton.textContent = "Check for updates";
        }
      });
    } catch (error) {
      checkButton.addEventListener("click", () => showStatus("Update checking is not available."));
    }
  }
  document.getElementById("apply-update").addEventListener("click", () => {
    if (waitingWorker) waitingWorker.postMessage({ type: "SKIP_WAITING" });
  });
  let refreshing = false;
  navigator.serviceWorker?.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  registerServiceWorker();
})();
