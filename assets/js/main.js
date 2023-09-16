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
    document.getElementById(role).style.display = "flex";
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

function openIframe() {
    document.getElementById("iframe_container").style.width = "100%";
}

function closeIframe() {
    document.getElementById("iframe_container").style.width = "0%";
}
$(window).on('load', function () {
    $('#loader').hide();
    console.log('dsdsdsd');
})