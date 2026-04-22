# Loggerhead v1.3 - Web Edition

Loggerhead is a lightweight, browser-based log analysis and cleaning tool. Originally developed as a Python application, this web edition provides the same powerful log-scrubbing capabilities directly in your browser as a static GitHub Pages site.

**Live Demo:** [https://antonlidstroem.github.io/Loggerhead-web/](https://antonlidstroem.github.io/Loggerhead-web/)

---

## Overview

Loggerhead is designed to help developers and system administrators parse through dense log files by removing repetitive noise and highlighting critical information. It uses regex-based filtering to "wash" logs and applies automatic syntax highlighting based on common log levels.

## Key Features

* **Log Washing:** Automatically replaces long URLs and tracking IDs with simplified placeholders to improve readability.
* **Automatic Highlighting:** Color-codes log entries into categories:
    * **Red:** Errors, Failures, and Tracebacks.
    * **Orange:** Warnings and Interventions.
    * **Blue:** Info, XHR, and Fetch requests.
    * **Purple:** System messages and metadata.
* **Local Processing:** Files are read locally in the browser. No data is uploaded to a server, ensuring your log data remains private.
* **Clipboard Support:** Quickly paste logs directly from your clipboard for instant analysis.
* **File Monitoring Simulation:** Supports loading .txt and .log files for immediate review.

## How to Use

1.  **Load Data:** Click the **Open File** button to select a log file from your computer, or use the **Paste** button to import text from your clipboard.
2.  **Analyze:** The tool automatically applies color-coding upon loading.
3.  **Wash Logs:** Click the **Wash & Analyze** button to run the cleaning script, which strips out noise like long URLs and unique identifiers.
4.  **Clear:** Use the **Clear** button to reset the workspace for a new session.

## Privacy and Security

Because Loggerhead is hosted as a static site on GitHub Pages, all processing happens on the client side (your browser). Your logs are never sent to a remote server, making it safe for analyzing sensitive local data.

## Technical Details

* **Language:** HTML5, CSS3, Vanilla JavaScript.
* **Deployment:** GitHub Pages.
* **Compatibility:** Works in all modern web browsers (Chrome, Firefox, Edge, Safari).

---

## License

This project is open-source and available under the MIT License.