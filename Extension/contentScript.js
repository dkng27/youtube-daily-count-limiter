const getVideoMinuteLength = () => {
    const time_segments = document
        .querySelector("span.ytp-time-duration")
        .innerText.split(":");
    // more than an hour
    if (time_segments.length > 2) {
        return (
            parseInt(time_segments[time_segments.length - 1]) +
            60 * parseInt(time_segments[time_segments.length - 2])
        );
    }
    // two segments
    else {
        return parseInt(time_segments[0]);
    }
    // fallback
    return 0;
};

const newPageLoad = () => {
    // debug line
    console.log("triggered");
    const today = new Date().getDate().toString();

    // if no video playing
    const path = window.location.pathname;
    console.log(path);
    if (path !== "/watch" && path !== "/shorts") return;

    // date:
    chrome.storage.local.get(
        {
            date: today,
            limit: 8,
            list: [],
            bypassMinuteThreshold: 100,
            bypass: false,
        },
        (config) => {
            // debug line
            console.log(config);
            if (config.date !== today) {
                chrome.storage.local.set({
                    list: [],
                    date: today,
                });
            }
            if (
                !config.list.includes(document.URL) &&
                getVideoMinuteLength() <= config.bypassMinuteThreshold
            ) {
                if (config.list.length >= config.limit && !config.bypass) {
                    // window.stop();
                    window.location.href = chrome.runtime.getURL("banner.html");
                    // setTimeout(() => {
                    //     // alert(`Daily limit of ${config.limit} videos reached!`);
                    //     // document.querySelector("body").remove();
                    // }, 500);
                } else {
                    const list = config.list;
                    list.push(document.URL);
                    chrome.storage.local.set({
                        list: list,
                        date: config.date,
                        bypass: false,
                    });
                }
            }
        }
    );
};

document.addEventListener("DOMContentLoaded", newPageLoad)
document.addEventListener("yt-navigate-start", newPageLoad)
// document.addEventListener("yt-page-data-fetched", newPageLoad);
