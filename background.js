let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

/**
 * 以下、プロト
 */
chrome.action.onClicked.addListener(function () {
  chrome.windows.create({
    url: "app.html",
    focused: true,
    type: "popup",
  });
});
