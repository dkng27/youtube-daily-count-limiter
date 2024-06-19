function clearCounter() {
    chrome.storage.local.set({ list: [] }, () => {
        const status = document.getElementById("status");
        document.getElementById("watch-count").innerText = 0;
        fillInPopup();
        status.innerText = "Cleared!";
        setTimeout(() => {
            status.innerText = "";
        }, 1000);
    });
}

function saveLimit(limit_, bypassThreshold_, allowBypass_) {
    chrome.storage.local.set(
        {
            limit: limit_,
            bypassMinuteThreshold: bypassThreshold_,
            allowBypass: allowBypass_,
        },
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
        { list: [], limit: 8, bypassMinuteThreshold: 100, allowBypass: false },
        (result) => {
            // How many videos watched
            document.getElementById("watch-count").innerText =
                result.list.length;

            document.getElementById("watch-count").style.color =
                result.list.length > result.limit ? "red" : "green";

            // Video limit
            document.getElementById("new-limit").value = result.limit;

            // Whether allow "ignore videos longer than" and threshold
            const lengthBypassChecked = result.bypassMinuteThreshold <= 99;
            document.getElementById("length-bypass-check").checked =
                lengthBypassChecked;
            document.getElementById("bypass-threshold").value =
                lengthBypassChecked ? result.bypassMinuteThreshold : 30;

            // Whether allow "Just one more" button
            document.getElementById("allow-bypass-check").checked =
                result.allowBypass;
        }
    );
};

document.addEventListener("DOMContentLoaded", fillInPopup);
document.getElementById("save-limit").onclick = () => {
    saveLimit(
        document.getElementById("new-limit").value,
        document.getElementById("length-bypass-check").checked
            ? document.getElementById("bypass-threshold").value
            : 100,
        document.getElementById("allow-bypass-check").checked
    );
};
document.getElementById("clear-watch-count").onclick = () => {
    clearCounter();
};
