function clearCounter() {
    chrome.storage.local.set(
        { list: [] },
        () => {
            const status = document.getElementById("status")
            document.getElementById("watch-count").innerText = 0
            status.innerText = "Cleared!"
            setTimeout(() => {
                status.innerText = ""
            }, 1000)
        }
    )
}

function saveLimit(limit_) {
    chrome.storage.local.set(
        { limit: limit_ },
        () => {
            const status = document.getElementById("status")
            status.innerText = "Saved!"
            setTimeout(() => {
                status.innerText = ""
            }, 1000)
        }
    )
}

const fillInPopup = () => {
    chrome.storage.local.get({ list: [] },
        (result) => {
            document.getElementById("watch-count").innerText = result.list.length
        }
    )

    chrome.storage.local.get({ limit: 8 },
        (result) => {
            document.getElementById("new-limit").value = result.limit
        }
    )
}

document.addEventListener('DOMContentLoaded', fillInPopup);
document.getElementById("save-limit").onclick = () => { saveLimit(document.getElementById("new-limit").value) }
document.getElementById("clear-watch-count").onclick = () => { clearCounter() }