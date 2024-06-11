function clearCounter() {
    chrome.storage.local.set({ list: [] }, () => {
        const status = document.getElementById("status");
        document.getElementById("watch-count").innerText = 0;
        status.innerText = "Cleared!";
        setTimeout(() => {
            status.innerText = "";
        }, 1000);
    });
}

function saveLimit(limit_, bypassThreshold_) {
    chrome.storage.local.set(
        { limit: limit_, bypassMinuteThreshold: bypassThreshold_ },
        () => {
            const status = document.getElementById("status");
            status.innerText = "Saved!";
            setTimeout(() => {
                status.innerText = "";
            }, 1000);
        }
    );
}

const fillInPopup = () => {
    chrome.storage.local.get(
        { list: [], limit: 8, bypassMinuteThreshold: 62 },
        (result) => {
            document.getElementById("watch-count").innerText =
                result.list.length;
            document.getElementById("new-limit").value = result.limit;
            if (result.bypassMinuteThreshold > 60) {
                document.getElementById("bypass-check").checked = false;
                document.getElementById("bypass-threshold").value = 30;
            } else {
                document.getElementById("bypass-check").checked = true;
                document.getElementById("bypass-threshold").value =
                    result.bypassMinuteThreshold;
            }
        }
    );
};

document.addEventListener("DOMContentLoaded", fillInPopup);
document.getElementById("save-limit").onclick = () => {
    saveLimit(
        document.getElementById("new-limit").value,
        document.getElementById("bypass-check").checked
            ? document.getElementById("bypass-threshold").value
            : 100
    );
};
document.getElementById("clear-watch-count").onclick = () => {
    clearCounter();
};
