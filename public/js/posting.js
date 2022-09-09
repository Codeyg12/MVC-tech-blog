// Creates new post with user input
const newPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContent").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.replace("/dashboard");
    } else {
      alert("Failed to create post!");
    }
  }
};

// Deletes the post if it belongs to the user
const deletePostHandler = async (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = e.target.getAttribute("data-id");

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    location.replace("/dashboard");
  }
};

document.querySelector("#postForm").addEventListener("submit", newPostHandler);

document
  .querySelector("#deletePost")
  .addEventListener("click", deletePostHandler);
