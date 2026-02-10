const searchInput = document.getElementById("search-input");

// function that works on input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const days = document.querySelectorAll(".day");

  // first check the dates, if there are no events on that date matching the search term, hide the date heading
  days.forEach((day) => {
    const events = day.querySelectorAll(".event-list__item");
    let anyVisible = false;

    //   check if there is a match in the search term & the event titles - if not, display: none
    events.forEach((evt) => {
      const title = evt.dataset.title || "";
      const match = title.includes(query);
      evt.style.display = match ? "" : "none";
      if (match) anyVisible = true;
    });

    day.style.display = anyVisible ? "" : "none";
  });
});
