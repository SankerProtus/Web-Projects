const textField = document.getElementById("text-field");
const ageBtn = document.getElementById("btn");
const date = document.getElementById("date");
const displayAge = document.querySelector(".displayAge");
document.getElementById('copyright-year').textContent = new Date().getFullYear();
const currentDate = new Date();


date.innerHTML = currentDate.toLocaleDateString('en-US');

displayAge.style.display = "none";

ageBtn.addEventListener("click", () => {
    textField.classList.remove("error-input", "shake");

    const birthDate = new Date(textField.value);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
        showerror("⚠️ Please enter a valid date!");
        return
    }
    
    if (birthDate > currentDate) {
        showerror("⚠️ Birth date cannot be in the future!")
        return;
    }
    
    const age = calculateAge(birthDate, today);
    displayResults(`You're ${age} years old!`);
    
});

function showerror(message) {
    displayAge.innerHTML = message;
    displayAge.style.backgroundColor = "rgba(253, 68, 45, 1)";
    displayAge.style.color = "#fff";
    displayAge.style.display = "block";
    textField.classList.add("shake", "error-input");
    setTimeout( () => {
        textField.classList.remove("shake", "error-input"),
        textField.value = "",
        displayAge.style.display = "none";
    }, 2000)
}

function displayResults(message) {
    displayAge.innerHTML = message;
    displayAge.style.backgroundColor = "";
    displayAge.style.color = "#fff";
    displayAge.style.display = "block";
    setTimeout( () => {
        displayAge.style.display = "none",
        textField.value = ""
    }, 5000);
}

function calculateAge(birthDate, today) {
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}