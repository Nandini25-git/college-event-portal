const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const eventCards = document.querySelectorAll(".event-card");
const noEvents = document.getElementById("noEvents");

const modal = document.getElementById("registrationModal");
const closeModal = document.getElementById("closeModal");
const registrationForm = document.getElementById("registrationForm");
const selectedEvent = document.getElementById("selectedEvent");
const formMessage = document.getElementById("formMessage");

let currentEvent = "";

// Search and category filtering
function filterEvents() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    eventCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        const description = card.querySelector(".event-info").innerText.toLowerCase();

        const matchesSearch =
            title.includes(searchText) || description.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory.toLowerCase();

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noEvents.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

// Open registration popup
document.querySelectorAll(".register-btn[data-event]").forEach(button => {
    button.addEventListener("click", () => {
        currentEvent = button.dataset.event;
        selectedEvent.textContent = "Selected event: " + currentEvent;

        formMessage.textContent = "";
        registrationForm.reset();

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");

        document.getElementById("studentName").focus();
    });
});

// Close popup
function hideModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        hideModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideModal();
    }
});

// Handle registration form
registrationForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const collegeId = document.getElementById("studentId").value.trim();

    if (!name || !email || !collegeId) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    // Demo only: no data is sent to a server or saved permanently.
    formMessage.textContent =
        "Thank you, " + name + "! Your demo registration for " +
        currentEvent + " is complete.";

    registrationForm.reset();
});