document.getElementById("saveButton").addEventListener("click", async () => {
  // Delay to ensure content script is loaded
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Send a message to the content script requesting a save operation
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "saveToNotion" }, (response) => {
      const statusElement = document.getElementById("status");
      if (chrome.runtime.lastError) {
        statusElement.textContent = "Error: Could not save";
        console.error(chrome.runtime.lastError);
      } else {
        statusElement.textContent = "Success: Saved to Notion";
        console.log(response);
      }
      setTimeout(() => {
        statusElement.textContent = "";
      }, 3000);
    });
  });
});
