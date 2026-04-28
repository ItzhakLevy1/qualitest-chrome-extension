/*************************************************
 * Banner Logic
 *************************************************/
let bannerClosed = false;

function ensureExtensionBanner() {
    if (!document.body || bannerClosed || document.querySelector('.my-extension-banner')) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'my-extension-banner';

    const textSpan = document.createElement('span');
    // Updated text content as requested
    textSpan.innerHTML = '<div>🟢 תוסף הכרום לאתר פעיל</div>';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'my-extension-close';

    closeBtn.addEventListener('click', () => {
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

// Function to create and show a temporary centered notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    
    // Assign the CSS class defined in styles.css
    toast.className = 'custom-auto-click-toast';

    document.body.appendChild(toast);

    // Remove the notification after 2 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

// Function to find and click the "Apply now" button
function clickApplyButton() {
    // Select all potential buttons or links
    const buttons = document.querySelectorAll('button, a');
    
    for (let btn of buttons) {
        // Check if the button text matches "Apply now"
        if (btn.innerText.trim() === 'Apply now') {
            showToast('כפתור ה-Apply now נמצא ויוקלק');
            
            // Small delay after showing the message before clicking
            setTimeout(() => {
                btn.click();
            }, 1200);
            
            return true;
        }
    }
    return false;
}

/*************************************************
 * Initialization
 *************************************************/

// Wait for the page to load and then trigger actions
window.addEventListener('load', () => {
    // 1. Display the banner immediately if possible
    ensureExtensionBanner();

    // 2. Wait for dynamic content before searching for the button
    setTimeout(() => {
        const found = clickApplyButton();
        if (!found) {
            console.log('Apply button not found on this page.');
        }
    }, 2000);
});