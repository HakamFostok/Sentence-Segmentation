$(document).ready(function () {

    chrome.runtime.sendMessage({ method: "getDoubleSpace" }, function (response) {
        if (chrome.runtime.lastError || !response) {
            console.error("Failed to get doubleSpace status", chrome.runtime.lastError);
            return;
        }

        const isOnMode = response.message === "On";
        $("#doubleSpace").prop('checked', isOnMode);
    });

    $("#doubleSpace").change(function () {
        const current = $(this).prop('checked');
        chrome.runtime.sendMessage({ method: "doubleSpace", value: current }, function (response) {
            if (chrome.runtime.lastError) {
                console.error("Failed to set doubleSpace", chrome.runtime.lastError);
            }
        });
    });
});