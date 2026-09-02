const interestInfo = {
  volunteer: "Volunteers help with dog walking, cat socialization, and events. No experience needed!",
  foster: "Foster families receive full supply and veterinary support for temporary care.",
  adoption: "Great! Adoption requires an application, meet-and-greet, home check, and a short waiting period."
};

document.addEventListener("DOMContentLoaded", function () {
  const interestSelect = document.getElementById("interest");
  const infoBox = document.createElement("p");
  infoBox.id = "interestInfoBox";
  infoBox.style.fontStyle = "italic";
  interestSelect.insertAdjacentElement("afterend", infoBox);

  const savedInterest = localStorage.getItem("selectedInterest");
  if (savedInterest) {
    interestSelect.value = savedInterest;
    updateInfoBox(savedInterest);
  }

  interestSelect.addEventListener("change", function () {
    const selected = interestSelect.value;
    localStorage.setItem("selectedInterest", selected);
    updateInfoBox(selected);
  });

  const errorMessages = {
    name: "Full name is required.",
    email: "Please enter a valid email address."
  }
  function updateInfoBox(value) {
    infoBox.textContent = interestInfo[value] || "";
  }

  const form = document.querySelector("form");
  const fullName = document.getElementById("name");
  const email = document.getElementById("email");
  const requiredFields = [fullName];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop real submission every time
    let valid = true;
    clearErrors();

  requiredFields.forEach(field => {
    if (field.value.trim() === "") {
      showError(field, errorMessages [field.id]);
      valid = false;
    }
  });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (valid) {
      alert("Thank you! Your interest has been submitted.");
      form.reset();
    }
  });

  function showError(field, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.style.color = "red";
    error.style.display = "block";
    error.textContent = message;
    field.insertAdjacentElement("afterend", error);
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
  }
});
