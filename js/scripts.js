/**
 * Function to update the copyright year dynamically
 *
 * Updates the text content of the copyright element with the current year.
 * Ensures the displayed year is always up-to-date.
 */
function updateCopyrightYear() {
  const year = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyright");

  // Ensure the element exists before attempting to update its content
  if (copyrightElement) {
    copyrightElement.textContent = `© ${year} Nick Tesh - All Rights Reserved.`;
  }
}

// Update the copyright year on load
document.addEventListener("DOMContentLoaded", () => {
  updateCopyrightYear();
  setupCustomWordListener();
});

/**
 * Password Generator Script
 * Generates a random password based on user preferences.
 */
document.getElementById("generate").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const specialCharacters = Array.from(document.querySelectorAll("#special-characters input:checked"))
    .map((checkbox) => checkbox.value)
    .join("");
  let customWord = document.getElementById("custom-word").value;
  const customWordPosition = document.getElementById("custom-word-position").value;

  // Remove spaces from the custom word
  customWord = customWord.replace(/\s+/g, "");

  const password = generatePassword(length, specialCharacters, customWord, customWordPosition);
  document.getElementById("password").textContent = password;
});

/**
 * Generates a random password.
 * @param {number} length - The length of the password.
 * @param {string} specialCharacters - The special characters to include.
 * @param {string} customWord - The custom word or phrase to add.
 * @param {string} customWordPosition - The position of the custom word (beginning or end).
 * @returns {string} - The generated password.
 */
function generatePassword(length, specialCharacters, customWord, customWordPosition) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + specialCharacters;
  const adjustedLength = length - customWord.length;
  let password = "";
  for (let i = 0; i < adjustedLength; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  if (customWord) {
    password = customWordPosition === "beginning" ? customWord + password : password + customWord;
  }
  return password;
}

/**
 * Copy to clipboard functionality.
 */
document.getElementById("password").addEventListener("click", () => {
  const passwordText = document.getElementById("password").textContent;
  if (!passwordText) {
    return;
  }
  navigator.clipboard
    .writeText(passwordText)
    .then(() => {
      showTooltip();
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});

/**
 * Function to show the tooltip and hide it after 3 seconds.
 */
function showTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "block";
  setTimeout(() => {
    tooltip.style.display = "none";
  }, 3000);
}

/**
 * Function to show/hide custom word position based on custom word input
 */
function setupCustomWordListener() {
  const customWordInput = document.getElementById("custom-word");
  const customWordPositionLabel = document.getElementById("custom-word-position-label");
  const customWordPositionWrapper = document.getElementById("custom-word-position-wrapper");

  customWordInput.addEventListener("input", () => {
    if (customWordInput.value.trim() !== "") {
      customWordPositionLabel.style.display = "block";
      customWordPositionWrapper.style.display = "block";
    } else {
      customWordPositionLabel.style.display = "none";
      customWordPositionWrapper.style.display = "none";
    }
  });
}
