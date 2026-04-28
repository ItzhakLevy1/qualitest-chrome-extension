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
        if (btn.innerText.trim() === "Apply now") {
            showToast("כפתור ה-Apply now נמצא ויוקלק");
            
            // Small delay after showing the message before clicking
            setTimeout(() => {
                btn.click();
            }, 1200);
            
            return true;
        }
    }
    return false;
}

// Wait for the page to load and then search for the button
window.addEventListener('load', () => {
    // 2-second delay to ensure dynamic content is loaded
    setTimeout(() => {
        const found = clickApplyButton();
        if (!found) {
            console.log("Apply button not found on this page.");
        }
    }, 2000);
});