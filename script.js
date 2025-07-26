const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openmenu(){
    sideMenu.style.transform = 'translateX(-16rem)';
}
function closemenu(){
    sideMenu.style.transform = 'translateX(16rem)';
}

window.addEventListener('scroll', ()=>{
    if(scrollY > 50){
        navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.remove('bg-white','shadow-sm','bg-opacity-50', 'dark:border', 'dark:border-white/70', 'dark:bg-transparent');
    }else{
        navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.add('bg-white','shadow-sm','bg-opacity-50', 'dark:border', 'dark:border-white/70', 'dark:bg-transparent');
    }
})

//---------------light mode and dark mode---------------------------

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  function toggleTheme(){
    document.documentElement.classList.toggle('dark')
    if(document.documentElement.classList.contains('dark')){
        localStorage.theme= 'dark';
    }
    else{
        localStorage.theme = 'light';
    }
  }

//---------------form submission---------------------------

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.textContent = "";

      // Name validation: 2-40 alphabets and spaces only
      const nameValue = form.name.value.trim();
      if (!/^[A-Za-z\s]{2,40}$/.test(nameValue)) {
        status.textContent = "Please enter a valid name (2-40 alphabets and spaces only).";
        form.name.focus();
        return;
      }

      // Phone validation: Indian 10-digit mobile number
      const phoneValue = form.phone.value.trim();
      if (!/^[6-9]\d{9}$/.test(phoneValue)) {
        status.textContent = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
        form.phone.focus();
        return;
      }

      // Email validation: basic pattern
      const emailValue = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        status.textContent = "Please enter a valid email address.";
        form.email.focus();
        return;
      }

      // Message validation: not empty, max 500 chars
      const messageValue = form.message.value.trim();
      if (messageValue.length === 0 || messageValue.length > 500) {
        status.textContent = "Please enter your message (1-500 characters).";
        form.message.focus();
        return;
      }

      submitBtn.disabled = true;
      status.textContent = "Sending...";

      const data = {
        name: nameValue,
        phone: phoneValue,
        email: emailValue,
        message: messageValue,
        token: "a4b3c9e2f1a847d02bbf8e7a34c69dc2ea7c441263cdfed7c3c88d276f1d95d0",
        origin: window.location.origin
      };

      // console.log("Form data to be sent:", data);

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwj1mtoOGit3nf5LcYyx3CVxGFP3pXpqtTdWFf4hQkNYqpRE95Jz56cktgjVP3-tHe60A/exec", {
          method: "POST",
          headers: { 'Origin': window.location.origin },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.status === "success") {
          alert("✅ Thank you! Your request has been submitted successfully.");
          status.textContent = "Thank you! Your request has been submitted.";
          form.reset(); // Reset form after successful submission
        } else if (result.status === "unauthorized") {
          alert("❌ Unauthorized request. Please try again.");
          status.textContent = "Unauthorized request.";
        } else {
          alert("❌ Error: " + (result.message || "Something went wrong."));
          status.textContent = "Error: " + (result.message || "Something went wrong.");
        }
      } catch (err) {
        alert("❌ Network error. Please check your connection and try again.");
        status.textContent = "Network error. Please try again.";
      }
      submitBtn.disabled = false;
    });
  }
});

