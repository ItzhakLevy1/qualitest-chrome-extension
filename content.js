/*************************************************
 * Banner Logic
 *************************************************/
let bannerClosed = false;

function ensureExtensionBanner() {
  if (
    !document.body ||
    bannerClosed ||
    document.querySelector(".my-extension-banner")
  )
    return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "my-extension-banner";

  const textSpan = document.createElement("span");
  textSpan.innerHTML = "<div> 🟢 תוסף הכרום לאתר פעיל</div>";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.className = "my-extension-close";

  closeBtn.addEventListener("click", () => {
    bannerClosed = true;
    messageDiv.remove();
  });

  messageDiv.appendChild(textSpan);
  messageDiv.appendChild(closeBtn);
  document.body.appendChild(messageDiv);
}

/*************************************************
 * Toast & Auto-Click Logic
 *************************************************/

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "custom-auto-click-toast";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

/**
 * Stage 3: Clicks the "Please sign in" link on the SAP career portal
 */
function clickSignInLink() {
  const links = document.querySelectorAll("a");
  for (let link of links) {
    if (link.innerText.trim() === "Please sign in") {
      showToast("מבצע כניסה למערכת (Sign In)...");
      setTimeout(() => {
        link.click();
      }, 1000);
      return true;
    }
  }
  return false;
}

/**
 * Stage 2: Clicks the inner "Apply Now" button inside the dropdown
 */
function clickInnerApply() {
  const innerApplyBtn = document.querySelector("#applyOption-top-manual");

  if (innerApplyBtn) {
    console.log("Inner Apply Now button found. Clicking...");
    innerApplyBtn.click();
  } else {
    console.log("Inner Apply Now button not found.");
  }
}

/**
 * Stage 1: Finds the main "Apply now" button to open the dropdown
 */
function clickApplyButton() {
  const buttons = document.querySelectorAll("button, a");

  for (let btn of buttons) {
    if (
      btn.innerText.trim() === "Apply now" &&
      !btn.closest(".dropdown-menu")
    ) {
      showToast("כפתור ה-Apply now נמצא ויוקלק");

      setTimeout(() => {
        btn.click();
        setTimeout(clickInnerApply, 800);
      }, 1200);

      return true;
    }
  }
  return false;
}

/** Checks if the user already applied and closes the tab if so
 */
function checkAlreadyApplied() {
  const pageText = document.body.innerText;
  if (pageText.includes("You already applied for this position.")) {
    showToast("הטאב יסגר בעוד 3 שניות");

    setTimeout(() => {
      // Sends a message to background.js to close the tab
      chrome.runtime.sendMessage({ action: "close_tab" });
    }, 3000);

    return true;
  }
  return false;
}

/*************************************************
 * Initialization
 *************************************************/

window.addEventListener("load", () => {
  ensureExtensionBanner();

  setTimeout(() => {
    // First priority: Check if already applied
    if (checkAlreadyApplied()) return;

    // Second priority: Try to apply
    const jobPageFound = clickApplyButton();
    const signInFound = clickSignInLink();

    if (!jobPageFound && !signInFound) {
      console.log("No actionable elements found on this page.");
    }
  }, 2000);
});
