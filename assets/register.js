const form = document.getElementById("registration-form");
const statusBox = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

// Your Google Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqVoBvPeGNbuxLg4KMnegX4oFHIGnrfginSPxky4OBwovmFwRGdVY2O5iem4VdzNMl/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset UI state
  statusBox.classList.add("hidden");
  statusBox.innerText = "";

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";
  submitBtn.style.pointerEvents = "none";

  const formData = new FormData(form);

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    // Safer response handling
    const text = await response.text();
    const result = JSON.parse(text);

    if (result.result === "success") {
      statusBox.classList.remove("hidden");
      statusBox.innerText =
        "Registration successful! We will get back to you shortly.";
      statusBox.style.color = "green";

      form.reset();
    } else {
      throw new Error(result.error || "Unknown error");
    }
  } catch (err) {
    statusBox.classList.remove("hidden");
    statusBox.innerText = "Error submitting form. Please try again.";
    statusBox.style.color = "red";
  }

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit";
  submitBtn.style.pointerEvents = "auto";
});
