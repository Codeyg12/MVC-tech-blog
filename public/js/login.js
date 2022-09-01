const signupHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#nameSign").value.trim();
  const email = document.querySelector("#emailSign").value.trim();
  const password = document.querySelector("#passSign").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to sign up!");
    }
  }
};

const loginHandler = async (e) => {
  e.preventDefault();

  const email = document.querySelector("#emailLog").value.trim();
  const password = document.querySelector("#passLog").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in!");
    }

  }
};

document.querySelector("#signupForm").addEventListener("submit", signupHandler);
document.querySelector("#loginForm").addEventListener("submit", loginHandler);
