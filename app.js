const form = document.getElementById("registration_form");
const username = document.getElementById("username");
const email = document.getElementById("Email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止默认表单提交

    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;
    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isConfirmPasswordValid = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }

    if (isFormValid) {
        form.reset();
        document.querySelectorAll(".form_item").forEach((el) => {
            el.className = "form_item";
        
        
        document.getElementById("successModal").style.display = "flex";
        document.getElementById("AnonLaugh").play();
        });
      }
});

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    // Password is required
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "How could you forget that? Passwords do not match");
    return false;
  }
  return true;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Format field name with proper capitalization
function formatFieldName(input) {
  // input id: username -> Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form_item error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form_item success";
}

function checkEmail(input) {
    console.log("checkEmail called with:", input.value);   // <-- 调试
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(input.value.trim())) {
    showError(input, "Dame! Your Email is not valid");
    return false;
  }
  showSuccess(input);
  return true;
}

document.getElementById("playGifBtn").addEventListener("click", function() {
    document.getElementById("successModal").style.display = "flex";
    document.getElementById("AnonLaugh").currentTime = 0;
    document.getElementById("AnonLaugh").play();
});
