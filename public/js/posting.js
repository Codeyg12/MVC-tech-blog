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

const updatePostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#pTitle").value.trim();
  const content = document.querySelector("#pContent").value.trim();
  const postId = document.querySelector("#postId");
  const id = postId.getAttribute("data-postId");

  if (title && content) {
    await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    document.location.replace("/dashboard");
  }
};

const deletePostHandler = async () => {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
.querySelector("#postForm")
.addEventListener("submit", newPostHandler);

document
  .querySelector("#editForm")
  .addEventListener("submit", updatePostHandler);

document
  .querySelector("#deletePost")
  .addEventListener("click", deletePostHandler);
