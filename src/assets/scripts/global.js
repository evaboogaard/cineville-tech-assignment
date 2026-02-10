const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const days = document.querySelectorAll(".day");

  days.forEach((day) => {
    const events = day.querySelectorAll(".event-list__item");
    let anyVisible = false;

    events.forEach((evt) => {
      const title = evt.dataset.title || "";
      const match = title.includes(query);
      evt.style.display = match ? "" : "none";
      if (match) anyVisible = true;
    });

    day.style.display = anyVisible ? "" : "none";
  });
});
