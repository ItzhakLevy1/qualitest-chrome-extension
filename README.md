# Qualitest Auto-Apply Chrome Extension 🚀

A lightweight Chrome Extension designed to automate the initial steps of the job application process on the Qualitest career portal and SAP SuccessFactors.

## ✨ Features

- **Automated Button Clicking**: Automatically detects and clicks the 'Apply now' button on job description pages.
- **Dropdown Navigation**: Handles multi-stage application menus, selecting the manual application option automatically.
- **SAP Portal Integration**: Automatically triggers the 'Please sign in' modal when redirected to the SAP career portal.
- **Duplicate Prevention**: Detects if you have already applied for a position, notifies the user, and automatically closes the tab after 3 seconds.
- **Visual Feedback**: 
  - **Status Banner**: A persistent banner indicating the extension is active.
  - **Centered Toasts**: Large, clear notifications showing the current automated action.

## 🛠️ Installation

1. **Download/Clone** this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** (toggle in the top right corner).
4. Click **"Load unpacked"**.
5. Select the folder containing the extension files.

## 📁 Project Structure

- `manifest.json`: Extension metadata, permissions, and domain matching rules.
- `content.js`: Main logic for DOM manipulation and button detection.
- `background.js`: Service worker handling tab management and closure.
- `styles.css`: Custom styling for the banner and centered toast notifications.

## ⚙️ How it Works

1. **Site Detection**: The extension activates on `careers.qualitestgroup.com` and `career44.sapsf.com`.
2. **Logic Flow**:
   - Checks if the text "You already applied for this position" exists. If so, counts down 3 seconds and closes the tab.
   - If not applied, searches for the 'Apply now' button.
   - Upon clicking, waits for the dropdown and selects the manual 'Apply Now' option.
   - If on the SAP portal, searches for and clicks 'Please sign in'.

## 📝 License

This project is for personal use and automation efficiency. Use responsibly in accordance with site Terms of Service.