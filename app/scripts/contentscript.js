'use strict';
var elem;
var lineSeparator;
var doubleSpace;

$(document).ready(function () {
    let work = true;
    let border = false;
    lineSeparator = true;
    doubleSpace = false;

    //checking if switch is off
    chrome.runtime.sendMessage({ method: "getStatus" }, function (response) {
        if (response.message == "Off") {
            console.log("turned off");
            work = false;
            $("body").addClass("work");
        }
    });

    $("body.work *").mouseenter(function (e) {
        if (work == false) return;
        $(e.target).addClass("hoverActive");
        $(e.target).parent().addClass("hoverActiveParent");
        if (border == true)
            $(e.target).parent().addClass("border");
    });

    $("body.work *").mouseleave(function () {
        if (work == false) return;
        $(".hoverActive").removeClass("hoverActive");
        $(".hoverActiveParent").removeClass("hoverActiveParent");
        $(".border").removeClass("border");
    });

    $("body.work").mousedown(function (e) {
        if (work == false) return;
        $(".hoverActiveParent").attr("id", "pickMe");
    });

    chrome.runtime.sendMessage({ method: "getAutoSegment" }, function (response) {
        if (response.message == "On") {
            setTimeout(function () {
                segmentSection('body');
            }, 1000);
        }
    });

    chrome.runtime.sendMessage({ method: "getParaBorder" }, function (response) {

        if (response.message == "Off") {
            console.log("border turned off");
            border = false;
        }
        else {
            border = true;
        }
    });

    chrome.runtime.sendMessage({ method: "getDoubleSpace" }, function (response) {

        if (response.message == "On") {
            console.log("border turned On");
            doubleSpace = true;
        }
        else {
            doubleSpace = false;
        }
    });

    chrome.runtime.sendMessage({ method: "getLineSeparator" }, function (response) {
        if (response.message == "Off") {
            lineSeparator = false;
        }
        else if (response.message == "On") {
            lineSeparator = true;
        }
    });

});

// the following regex will execlude common abbreviations like i.e., e.g., etc., vs. from being considered as sentence boundaries
const regexForPeriod = /(?<!i\.e)(?<!e\.g)(?<!etc)(?<!vs)(?<!^\d)\.\s/gm;       //regex to find period
const regexForQuestion = /\?\s/g;     //regex to find question mark
const regexForExclamation = /\!\s/g; //regex to find exclamation mark
const regexForDotBeforeClosingParanthesis = /\.\) /g; //regex to find period before closing paran tag

const lineBreak = ".<br/>";
const questionBreak = "?<br/>";
const exclamationBreak = "!<br/>";
const dotBeforeClosingParanthesisBreak = ".)<br/>";

var segmentSection = function (which) {
    if (which == "section") elem = "#pickMe";
    else elem = "p";
    $(elem).each(function () {
        let v = $(this).html();
        if (v === "")
            return; //skip if no text content

        v = v.replace(regexForPeriod, lineBreak);               //replacing period with period and newline
        v = v.replace(regexForQuestion, questionBreak);         //replacing questionmark with questionmark and newline
        v = v.replace(regexForExclamation, exclamationBreak);   //replacing exclamation mark with exclamation mark and newline
        v = v.replace(regexForDotBeforeClosingParanthesis, dotBeforeClosingParanthesisBreak); //replacing period before closing paran tag with period and newline
        $(this).html(v);        //adding replaced content back to the DOM element
    });
    $("#pickMe").attr("id", "");
};