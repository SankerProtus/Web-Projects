const sections = document.querySelectorAll(".section");
sections.forEach(section => {
    const icon = section.querySelector(".icon");
    section.addEventListener("click", () => {
        section.classList.toggle("active");
        icon.classList.toggle("active");
        icon.innerText = icon.classList.contains("active") ? "−" : "+";
    });
});
