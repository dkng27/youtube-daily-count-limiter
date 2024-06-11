document.getElementById("bypass").onclick = () => {
    console.log("bypassed");
    chrome.storage.local.get({ list: [] }, (items) => {
        chrome.storage.local.set({ bypass: true });
    });
    history.back()
};

chrome.storage.local.get({ limit: 8 }, (items) => {
    document.getElementById("banner-limit").innerText = items.limit;
});
