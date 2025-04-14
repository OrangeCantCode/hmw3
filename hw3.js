const dateElem = document.getElementById("currentDate");
if (dateElem) {
  const now = new Date();
  dateElem.textContent = now.toLocaleDateString();
}

const rangeElem = document.getElementById("healthRange");
const healthVal = document.getElementById("healthValue");
if (rangeElem && healthVal) {
  healthVal.textContent = rangeElem.value;
  rangeElem.oninput = function() {
    healthVal.textContent = this.value;
  };
}

function validateFname() {
  const fname = document.getElementById("fname").value;
  const pattern = /^[a-zA-Z'-]{1,30}$/;
  if (!pattern.test(fname)) {
    document.getElementById("fname-error").textContent = "Invalid first name.";
    return false;
  } else {
    document.getElementById("fname-error").textContent = "";
    return true;
  }
}

function validateMini() {
  let mini = document.getElementById("mini").value;
  mini = mini.toUpperCase();
  document.getElementById("mini").value = mini;
  const pattern = /^[A-Z]$/;
  if (!pattern.test(mini)) {
    document.getElementById("mini-error").textContent = "Middle initial must be a single uppercase letter";
    return false;
  } else {
    document.getElementById("mini-error").textContent = "";
    return true;
  }
}

function validateLname() {
  const lname = document.getElementById("lname").value;
  const pattern = /^[a-zA-Z'-]{1,30}$/;
  if (!pattern.test(lname)) {
    document.getElementById("lname-error").textContent = "Invalid last name.";
    return false;
  } else {
    document.getElementById("lname-error").textContent = "";
    return true;
  }
}

function validateAddress1() {
  const address = document.getElementById("address1").value;
  if (address.trim().length < 2 || address.trim().length > 30) {
    document.getElementById("address1-error").textContent = "Address must be between 2 and 30 characters.";
    return false;
  } else {
    document.getElementById("address1-error").textContent = "";
    return true;
  }
}

function validateDob() {
  const dobElem = document.getElementById("dob");
  const dob = new Date(dobElem.value);
  const now = new Date();
  let maxDate = new Date();
  maxDate.setFullYear(now.getFullYear() - 120);
  if (dob > now) {
    document.getElementById("dob-error").textContent = "Date can't be in the future.";
    dobElem.value = "";
    return false;
  } else if (dob < maxDate) {
    document.getElementById("dob-error").textContent = "Date can't be more than 120 years ago.";
    dobElem.value = "";
    return false;
  } else {
    document.getElementById("dob-error").textContent = "";
    return true;
  }
}

function validateSsn() {
  const ssn = document.getElementById("ssn").value;
  const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
  if (!ssnR.test(ssn)) {
    document.getElementById("ssn-error").textContent = "Please enter a valid SSN.";
    return false;
  } else {
    document.getElementById("ssn-error").textContent = "";
    return true;
  }
}

function validateZcode() {
  const zipInput = document.getElementById("zcode");
  let zip = zipInput.value.replace(/[^\d-]/g, "");
  if (!zip) {
    document.getElementById("zcode-error").textContent = "Zip code can't be blank.";
    return false;
  }
  if (zip.length > 5 && zip.indexOf("-") === -1) {
    zip = zip.slice(0,5) + "-" + zip.slice(5,9);
  } else {
    zip = zip.slice(0,5);
  }
  zipInput.value = zip;
  document.getElementById("zcode-error").textContent = "";
  return true;
}

function validateEmail() {
  const emailElem = document.getElementById("email");
  const email = emailElem.value;
  const emailR = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/;
  if (email.trim() === "") {
    document.getElementById("email-error").textContent = "Email can't be blank.";
    return false;
  } else if (!emailR.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    return false;
  } else {
    document.getElementById("email-error").textContent = "";
    return true;
  }
}

function validatePhone() {
  const phoneElem = document.getElementById("phone");
  const phone = phoneElem.value;
  const phoneR = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (phone.trim() === "") {
    document.getElementById("phone-error").textContent = "Phone number can't be blank.";
    return false;
  } else if (!phoneR.test(phone)) {
    document.getElementById("phone-error").textContent = "Phone number must be in the format 000-000-0000.";
    return false;
  } else {
    document.getElementById("phone-error").textContent = "";
    return true;
  }
}

function validateUid() {
  const uidElem = document.getElementById("uid");
  let uid = uidElem.value.toLowerCase();
  uidElem.value = uid;
  if (uid.length === 0) {
    document.getElementById("uid-error").textContent = "User ID can't be blank.";
    return false;
  }
  if (!isNaN(uid.charAt(0))) {
    document.getElementById("uid-error").textContent = "User ID can't start with a number.";
    return false;
  }
  const regex = /^[a-zA-Z0-9_-]+$/;
  if (!regex.test(uid)) {
    document.getElementById("uid-error").textContent = "User ID can only have letters, numbers, underscores, and dashes.";
    return false;
  } else if (uid.length < 5) {
    document.getElementById("uid-error").textContent = "User ID must be at least 5 characters.";
    return false;
  } else if (uid.length > 30) {
    document.getElementById("uid-error").textContent = "User ID can't exceed 30 characters.";
    return false;
  } else {
    document.getElementById("uid-error").textContent = "";
    return true;
  }
}

function validatePword() {
  const pword = document.getElementById("pword").value;
  const uid = document.getElementById("uid").value;
  let errorMessages = [];
  if (pword.length < 10) {
    errorMessages.push("Password must be at least 10 characters.");
  }
  if (!pword.match(/[a-z]/)) {
    errorMessages.push("Enter at least one lowercase letter.");
  }
  if (!pword.match(/[A-Z]/)) {
    errorMessages.push("Enter at least one uppercase letter.");
  }
  if (!pword.match(/[0-9]/)) {
    errorMessages.push("Enter at least one number.");
  }
  if (!pword.match(/[!\@#\$%&*\-_\.\+\(\)]/)) {
    errorMessages.push("Enter at least one special character.");
  }
  if (uid && pword.toLowerCase().includes(uid.toLowerCase())) {
    errorMessages.push("Password can't contain user ID.");
  }
  document.getElementById("msg1").textContent = errorMessages[0] || "";
  document.getElementById("msg2").textContent = errorMessages[1] || "";
  document.getElementById("msg3").textContent = errorMessages[2] || "";
  document.getElementById("msg4").textContent = errorMessages[3] || "";
  return errorMessages.length === 0;
}

function confirmPword() {
  const pword1 = document.getElementById("pword").value;
  const pword2 = document.getElementById("con_pword").value;
  if (pword1 !== pword2) {
    document.getElementById("pword2-error").textContent = "Passwords don't match.";
    return false;
  } else {
    document.getElementById("pword2-error").textContent = "Passwords match.";
    return true;
  }
}

function validateCity() {
  let city = document.getElementById("city").value.trim();
  if (!city) {
    document.getElementById("city-error").textContent = "City can't be blank";
    return false;
  } else {
    document.getElementById("city-error").textContent = "";
    return true;
  }
}

function showAlert() {
  var alertBox = document.getElementById("alert-box");
  var closeAlert = document.getElementById("close-alert");
  alertBox.style.display = "block";
  closeAlert.onclick = function() {
    alertBox.style.display = "none";
  };
}

function validateEverything() {
  let valid = true;
  if (!validateFname()) { valid = false; }
  if (!validateMini()) { valid = false; }
  if (!validateLname()) { valid = false; }
  if (!validateDob()) { valid = false; }
  if (!validateSsn()) { valid = false; }
  if (!validateAddress1()) { valid = false; }
  if (!validateCity()) { valid = false; }
  if (!validateZcode()) { valid = false; }
  if (!validateEmail()) { valid = false; }
  if (!validatePhone()) { valid = false; }
  if (!validateUid()) { valid = false; }
  if (!validatePword()) { valid = false; }
  if (!confirmPword()) { valid = false; }
  if (valid) {
    document.getElementById("submit").disabled = false;
  } else {
    showAlert();
  }
}

function reviewInput() {
  const form = document.getElementById("signup");
  let formOutput = "<table class='output'><tr><th colspan='2'>Review Your Information:</th></tr>";
  for (let i = 0; i < form.elements.length; i++) {
    const elem = form.elements[i];
    if (elem.value !== "" && elem.type !== "button" && elem.type !== "submit") {
      if (elem.type === "checkbox") {
        if (elem.checked) {
          formOutput += `<tr><td align='right'>${elem.name}</td><td>&#x2713;</td></tr>`;
        }
      } else if (elem.type === "radio") {
        if (elem.checked) {
          formOutput += `<tr><td align='right'>${elem.name}</td><td>${elem.value}</td></tr>`;
        }
      } else {
        formOutput += `<tr><td align='right'>${elem.name}</td><td>${elem.value}</td></tr>`;
      }
    }
  }
  formOutput += "</table>";
  document.getElementById("showInput").innerHTML = formOutput;
}

function removeReview() {
  document.getElementById("showInput").innerHTML = "";
}

const regForm = document.querySelector("form");
if (regForm) {
  regForm.addEventListener("submit", function(e) {
    if (!confirmPword()) {
      alert("Passwords do not match.");
      e.preventDefault();
    }
  });
}
