/*************************************************
 * Banner Logic
 *************************************************/
let bannerClosed = false;

function ensureExtensionBanner() {
    if (!document.body || bannerClosed || document.querySelector('.my-extension-banner')) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'my-extension-banner';

    const textSpan = document.createElement('span');
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

function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.className = 'custom-auto-click-toast';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

/**
 * Stage 2: Clicks the inner "Apply Now" button inside the dropdown
 */
function clickInnerApply() {
    const innerApplyBtn = document.querySelector('#applyOption-top-manual');
    
    if (innerApplyBtn) {
        console.log('Inner Apply Now button found. Clicking...');
        innerApplyBtn.click();
    } else {
        console.log('Inner Apply Now button not found.');
    }
}

/**
 * Stage 1: Finds the main "Apply now" button to open the dropdown
 */
function clickApplyButton() {
    const buttons = document.querySelectorAll('button, a');
    
    for (let btn of buttons) {
        if (btn.innerText.trim() === 'Apply now' && !btn.closest('.dropdown-menu')) {
            showToast('כפתור ה-Apply now נמצא ויוקלק');
            
            setTimeout(() => {
                btn.click();
                
                // Stage 2: Wait for the dropdown to render, then click the manual option
                setTimeout(clickInnerApply, 800); 
            }, 1200);
            
            return true;
        }
    }
    return false;
}

/*************************************************
 * Initialization
 *************************************************/

window.addEventListener('load', () => {
    ensureExtensionBanner();

    setTimeout(() => {
        const found = clickApplyButton();
        if (!found) {
            console.log('Initial Apply button not found.');
        }
    }, 2000);
});