/* Rancang Bangun Engineering Toolkit Hub v1.0 */
(() => {
  "use strict";

  const HUB_VERSION = "1.0.0";
  const tools = {
    process: {
      eyebrow: "PROCESS ENGINEERING",
      title: "Process Tools",
      description: "Fluid flow and preliminary process calculation tools.",
      cards: [
        {
          title: "Pressure Drop Calculator",
          description: "Estimate preliminary line pressure drop, velocity, Reynolds number, and velocity reference checks.",
          url: "https://osaftari-source.github.io/Pressure-Drop-Calculator/",
          tags: ["Fluid Flow", "Pressure Drop", "Standalone Trial App"]
        }
      ]
    },
    piping: {
      eyebrow: "PIPING ENGINEERING",
      title: "Piping Tools",
      description: "Quantity preparation and preliminary pipe support evaluation tools.",
      cards: [
        {
          title: "Piping MTO Generator",
          description: "Prepare preliminary piping material take-off data and exportable output.",
          url: "https://osaftari-source.github.io/Piping-MTO-Generator/",
          tags: ["MTO", "Materials", "Standalone App"]
        },
        {
          title: "Pipe Support Span",
          description: "Estimate preliminary support spacing and vertical distributed load for site survey use.",
          url: "https://osaftari-source.github.io/Pipe-Support-Span/",
          tags: ["Support Span", "Site Survey", "Standalone Trial App"]
        }
      ]
    }
  };

  const disciplineView = document.getElementById("disciplines-view");
  const toolsView = document.getElementById("tools-view");
  const toolCards = document.getElementById("tool-cards");
  const toolsEyebrow = document.getElementById("tools-eyebrow");
  const toolsTitle = document.getElementById("tools-title");
  const toolsDescription = document.getElementById("tools-description");
  const statusToast = document.getElementById("status-toast");

  function showStatus(message) {
    statusToast.textContent = message;
    statusToast.classList.remove("hidden");
    window.clearTimeout(showStatus.timer);
    showStatus.timer = window.setTimeout(() => statusToast.classList.add("hidden"), 2900);
  }

  function renderTools(key) {
    const discipline = tools[key];
    if (!discipline) return;

    toolsEyebrow.textContent = discipline.eyebrow;
    toolsTitle.textContent = discipline.title;
    toolsDescription.textContent = discipline.description;

    toolCards.innerHTML = discipline.cards.map(tool => `
      <a class="tool-card" href="${tool.url}" target="_blank" rel="noopener noreferrer">
        <div class="tool-card-top">
          <h3>${tool.title}</h3>
          <span class="open-label">Open tool ↗</span>
        </div>
        <p>${tool.description}</p>
        <div class="tags">${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      </a>
    `).join("");

    disciplineView.classList.remove("active");
    toolsView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-open-discipline]").forEach(button => {
    button.addEventListener("click", () => renderTools(button.dataset.openDiscipline));
  });

  document.getElementById("back-button").addEventListener("click", () => {
    toolsView.classList.remove("active");
    disciplineView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // PWA installation prompt for the hub only.
  let deferredInstallPrompt = null;
  const installPrompt = document.getElementById("install-prompt");
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (!sessionStorage.getItem("hub-install-dismissed")) {
      installPrompt.classList.remove("hidden");
    }
  });
  document.getElementById("install-button").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installPrompt.classList.add("hidden");
  });
  document.getElementById("dismiss-install").addEventListener("click", () => {
    sessionStorage.setItem("hub-install-dismissed", "true");
    installPrompt.classList.add("hidden");
  });

  // Safe update workflow: never manually clears browser caches.
  let waitingWorker = null;
  const updateToast = document.getElementById("update-toast");
  const checkButton = document.getElementById("check-update");

  function announceUpdate(worker) {
    waitingWorker = worker;
    updateToast.classList.remove("hidden");
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=" + HUB_VERSION, {
        updateViaCache: "none"
      });
      if (registration.waiting && navigator.serviceWorker.controller) {
        announceUpdate(registration.waiting);
      }
      registration.addEventListener("updatefound", () => {
        const candidate = registration.installing;
        if (!candidate) return;
        candidate.addEventListener("statechange", () => {
          if (candidate.state === "installed" && navigator.serviceWorker.controller) {
            announceUpdate(candidate);
          }
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
