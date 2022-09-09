const updatePostHandler = async (e) => {
    e.preventDefault();
  
    const title = document.querySelector("#pTitle").value.trim();
    const content = document.querySelector("#pContent").value.trim();
    const id = window.location.pathname.split('/')[3];
  
    console.log("ID:", id)

    if (title && content) {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      location.replace(`/post/${{id}}`);
    }
  };

document
.querySelector("#editForm")
.addEventListener("submit", updatePostHandler);