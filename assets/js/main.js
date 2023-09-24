// Get the element with id="defaultOpen" and click on it
if (document.getElementById("defaultOpen")) {
    document.getElementById("defaultOpen").click();
}
function openRole(evt, role) {
    // Declare all variables
    var i, tech_tab_content, tech_tab;

    // Get all elements with class="tech_tab_content" and hide them
    tech_tab_content = document.getElementsByClassName("tech_tab_content");
    for (i = 0; i < tech_tab_content.length; i++) {
        tech_tab_content[i].style.display = "none";
    }

    // Get all elements with class="tech_tab" and remove the class "active"
    tech_tab = document.getElementsByClassName("tech_tab");
    for (i = 0; i < tech_tab.length; i++) {
        tech_tab[i].className = tech_tab[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(role).style.display = "block";
    evt.currentTarget.className += " active";
}

function showAnswer(event, answer) {
    const currentAnswer = document.getElementById(answer);
    event.currentTarget.classList.toggle("active");
    if (currentAnswer.style.display === "block") {
        currentAnswer.style.display = "none";
    } else {
        currentAnswer.style.display = "block"
    }

}

function openIframe(src) {
    document.getElementById("iframe_container").style.width = "100%";
    var iframe = document.querySelector('iframe');
    iframe.src = src;
}

function closeIframe() {
    document.getElementById("iframe_container").style.width = "0%";
    var iframe = document.querySelector('iframe');
    iframe.src = '';
}
$(window).on('load', function () {
    $('#loader').hide();
})

$(document).ready(function () {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('#video-img').replaceWith('<img src="./assets/images/Card Animation.gif" >');
    }
});

/** prepare hubspot forms */
function formFieldsToHSJSON(form) {
    let fieldArray = [];
    let formData = new FormData(form);
    for (let field of formData) {
        let values = {
            "name": field[0],
            "value": field[1]
        }
        fieldArray.push(values)
        console.log(fieldArray);
    }
    return fieldArray;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
};
var hubspotUtk = getCookie('hubspotutk');

function buildHSContext() {
    let hsContext = new Object()
    hsContext.hutk = getCookie('hubspotutk');
    hsContext.pageUri = window.location.href;
    hsContext.pageName = document.title;
    return hsContext
}

function prepareHSFormSubmission(form) {
    var submissionData = new Object()
    submissionData.submittedAt = Date.now()
    submissionData.fields = formFieldsToHSJSON(form)
    submissionData.context = buildHSContext()
    return submissionData
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json() // parses JSON response into native JS objects
}

function submitHSForm(hsFormURL, data) {
    postData(hsFormURL, data).then(data => {
        if (data.inlineMessage) {
            // Set an inline thank you message
            document.querySelector("#thankyou").innerHTML = data.inlineMessage
        }
    });
}

var forVerifierForm = document.getElementById('Verifier-form') //alter for your forms ID or CSS selector
if (forVerifierForm) {
    forVerifierForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var baseSubmitURL = 'https://api.hsforms.com/submissions/v3/integration/submit'
        // Add the HubSpot portalID where the form should submit
        var portalId = '25665890'
        // Add the HubSpot form GUID from your HubSpot portal
        var formGuid = '3e5fcb84-39f4-448a-8379-d8e00da853bc' //replace with the formGUID copied from the form created inside HubSpot Forms
        var submitURL = `${baseSubmitURL}/${portalId}/${formGuid}`
        var formData = prepareHSFormSubmission(forVerifierForm);
        submitHSForm(submitURL, formData);
        forVerifierForm.reset()
    });
}

var subscribeForm = document.getElementById('Subscribe-form') //alter for your forms ID or CSS selector
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var baseSubmitURL = 'https://api.hsforms.com/submissions/v3/integration/submit'
        // Add the HubSpot portalID where the form should submit
        var portalId = '25665890'
        // Add the HubSpot form GUID from your HubSpot portal
        var formGuid = 'cd96eb13-42f2-460e-9de2-9ee8e3f57497' //replace with the formGUID copied from the form created inside HubSpot Forms
        var submitURL = `${baseSubmitURL}/${portalId}/${formGuid}`
        var formData = prepareHSFormSubmission(subscribeForm);
        submitHSForm(submitURL, formData);
        subscribeForm.reset()
    });
}