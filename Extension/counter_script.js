const today = new Date().getDate().toString()

const newPageLoad = () => {
    // debug line
    console.log("triggered")

    if (window.location.pathname !== "/watch") 
        return

    chrome.storage.local.get(
        { date: today, limit: 8, list: [] },
        (items) => {
            // debug line
            console.log(items.date, items.list, items.limit)
            if (items.date !== today) {
                chrome.storage.local.set(
                    {
                        list: [document.URL],
                        date: today
                    }
                )
            } else if (!items.list.includes(document.URL)) {
                if (items.list.length >= items.limit) {
                    window.stop()
                    setTimeout(() => {alert(`Daily limit of ${items.limit} videos reached!`)}, 500)
                    document.querySelector("body").remove()
                    
                }
                else {
                    const list = items.list
                    list.push(document.URL)
                    chrome.storage.local.set(
                        {
                            list: list,
                            date: items.date
                        }
                    )
                }
            }
        }
    )
}
newPageLoad()
document.addEventListener('yt-navigate-start', newPageLoad)