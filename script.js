// PAGE NAVIGATION
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const pageButtons = document.querySelectorAll("[data-page]");
const navLinksContainer = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");


function showPage(pageId) {
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        return;
    }

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    // Show the selected page
    selectedPage.classList.add("active-page");

    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.dataset.page === pageId) {
            link.classList.add("active");
        }
    });

    // Close mobile navigation
    navLinksContainer.classList.remove("show-menu");

    // Update URL without reloading the website
    history.replaceState(null, "", "#" + pageId);

    // Start the selected page at the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Make navigation links and page buttons work
pageButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        showPage(this.dataset.page);
    });
});


// MOBILE MENU
menuToggle.addEventListener("click", function() {
    navLinksContainer.classList.toggle("show-menu");
});


// SKILLS TABS
const skillTabs = document.querySelectorAll(".skill-tab");
const skillContents = document.querySelectorAll(".skill-content");

skillTabs.forEach(tab => {
    tab.addEventListener("click", function() {

        // Remove active class from all skill tabs
        skillTabs.forEach(item => {
            item.classList.remove("active");
        });

        // Hide all skill information
        skillContents.forEach(content => {
            content.classList.remove("active-skill");
        });

        // Activate selected tab
        this.classList.add("active");

        // Display selected skill information
        const skillId = this.dataset.skill;
        document.getElementById(skillId).classList.add("active-skill");
    });
});


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const subject = document.getElementById("visitorSubject").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    const recipient = "ronaldamuyunzu@gmail.com";

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    const mailtoLink =
        "mailto:" + recipient +
        "?subject=" + emailSubject +
        "&body=" + emailBody;

    window.location.href = mailtoLink;
});


// AUTOMATIC FOOTER YEAR
document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// OPEN THE PAGE SPECIFIED IN THE URL
window.addEventListener("load", function() {
    const pageFromUrl = window.location.hash.replace("#", "");

    if (pageFromUrl && document.getElementById(pageFromUrl)) {
        showPage(pageFromUrl);
    } else {
        showPage("home");
    }
}); 