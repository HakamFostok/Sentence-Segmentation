chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed");
    chrome.storage.local.set({ 'switch': "On" });
    chrome.storage.local.set({ 'autoSegmentSwitch': "Off" });
    chrome.storage.local.set({ 'paraBorder': "Off" });
    chrome.storage.local.set({ 'lineSeparator': "Off" });
    chrome.storage.local.set({ 'doubleSpace': "Off" });
});

function onClickHandler(info, tab) {
    const segment = info.menuItemId === "segmentSection" ? "section" : "body";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: segmentSectionWrapper,
        args: [segment]
    });
}

function segmentSectionWrapper(target) {
    if (typeof segmentSection === "function") {
        segmentSection(target);
    }
}

chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed");
    chrome.storage.local.set({ 'switch': "On" });
    chrome.storage.local.set({ 'autoSegmentSwitch': "Off" });
    chrome.storage.local.set({ 'paraBorder': "Off" });
    chrome.storage.local.set({ 'lineSeparator': "Off" });
    chrome.storage.local.set({ 'doubleSpace': "Off" });
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const reloadTab = () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            });
        };

        if (request.method === "turnOff") {
            chrome.storage.local.set({ 'switch': request.value ? "Off" : "On" });
            sendResponse({ message: `Extension turned ${request.value ? "Off" : "On"}` });
            reloadTab();
        }
        // Add other cases as needed
        return true;
    }
);

function segmentSectionWrapper(target) {
    if (typeof segmentSection === "function") {
        segmentSection(target);
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

var mainSwitch = "";
var autoSegmentSwitch = "";
var paraBorder = "";
var lineSeparator = "";
var doubleSpace = "";

const getStatus = function () {
    chrome.storage.local.get(null, function (resp) {
        console.log(resp.switch);
        mainSwitch = resp.switch;
        chrome.contextMenus.create({ "title": "Segment Complete Page", "id": "segmentPage" });
    });
}

const getAutoSegment = function () {
    chrome.storage.local.get(null, function (resp) {
        console.log(resp.autoSegmentSwitch);
        autoSegmentSwitch = resp.autoSegmentSwitch;
    });
};

const getParaBorder = function () {
    chrome.storage.local.get(null, function (resp) {
        console.log(resp.paraBorder);
        paraBorder = resp.paraBorder;
    });
};

const getDoubleSpace = function () {
    chrome.storage.local.get(null, function (resp) {
        console.log(resp.doubleSpace);
        doubleSpace = resp.doubleSpace;
    });
};

const getLineSeparator = function () {
    chrome.storage.local.get(null, function (resp) {
        console.log(resp.lineSeparator);
        lineSeparator = resp.lineSeparator;
    });
};

setTimeout(function () {
    getStatus();
    getAutoSegment();
    getParaBorder();
    getLineSeparator();
    getDoubleSpace();
}, 500);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const reloadTab = () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            });
        };

        if (request.method === "turnOff") {
            chrome.storage.local.set({ 'switch': request.value ? "Off" : "On" });
            sendResponse({ message: `Extension turned ${request.value ? "Off" : "On"}` });
            reloadTab();
            getStatus();
        }
        else if (request.method === "autoSegment") {
            chrome.storage.local.set({ 'autoSegmentSwitch': request.value ? "On" : "Off" });
            sendResponse({ message: `Auto Segment turned ${request.value ? "On" : "Off"}` });
            reloadTab();
            getAutoSegment();
        }
        else if (request.method === "paraBorder") {
            chrome.storage.local.set({ 'paraBorder': request.value ? "On" : "Off" });
            sendResponse({ message: `paraBorder turned ${request.value ? "On" : "Off"}` });
            reloadTab();
            getParaBorder();
        }
        else if (request.method === "doubleSpace") {
            chrome.storage.local.set({ 'doubleSpace': request.value ? "On" : "Off" });
            sendResponse({ message: `doubleSpace turned ${request.value ? "On" : "Off"}` });
            reloadTab();
            getDoubleSpace();
        }
        else if (request.method === "lineSeparator") {
            chrome.storage.local.set({ 'lineSeparator': request.value ? "On" : "Off" });
            sendResponse({ message: `LineSeparator turned ${request.value ? "On" : "Off"}` });
            reloadTab();
            getLineSeparator();
        }
        else if (request.method === "getStatus") {
            sendResponse({ message: mainSwitch });
        }
        else if (request.method === "getParaBorder") {
            sendResponse({ message: paraBorder });
        }
        else if (request.method === "getDoubleSpace") {
            sendResponse({ message: doubleSpace });
        }
        else if (request.method === "getLineSeparator") {
            sendResponse({ message: lineSeparator });
        }
        else if (request.method === "getAutoSegment") {
            sendResponse({ message: autoSegmentSwitch });
        }
        else if (request.method === "segmentThisPage") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: segmentSectionWrapper,
                    args: ['body']
                });
            });
        }

        return true;
    }
);

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: segmentSectionWrapper,
        args: ['body']
    });
});