const newPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContent").value.trim();

  if (title && content) {
    await fetch("/api/dashboard", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to create post!");
    }
  }
};

document.querySelector("#postForm").addEventListener("submit", newPostHandler);
