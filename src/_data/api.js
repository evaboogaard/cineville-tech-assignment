import fetch from "node-fetch";

// helper to make a readable date
const toDateKey = (date) => {
  return date.toISOString().slice(0, 10);
};

// helper to ask for data for an x amount of days
const addDays = (date, days) => {
  const d = new Date(date);

  d.setDate(d.getDate() + days);

  return d;
};

// format day, datetime & time
const formatLabels = (date) => ({
  dayLabel: date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }),

  dateTimeLabel: date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }),

  time: date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

// main function, gets all the data from the API
export default async function fetchEvents() {
  const today = new Date();
  const endDate = addDays(today, 7);

  const startKey = toDateKey(today);
  const endKey = toDateKey(endDate);

  const response = await fetch(
    `https://api.cineville.nl/events
      ?embed[production]=true
      &embed[venue]=true
      &startDate[gte]=${startKey}T00:00:00.000Z
      &startDate[lt]=${endKey}T23:59:59.999Z`.replace(/\s+/g, ""),
  );

  const json = await response.json();

  const events = json._embedded?.events ?? [];

  const all = events
    .filter((e) => e._embedded?.production)
    .map((e) => {
      const { production, venue } = e._embedded;
      const start = new Date(e.startDate);
      const labels = formatLabels(start);

      console.log(e.attributes);

      return {
        eventId: e.id,
        title: production.title,
        slug: production.slug ?? `event-${e.id}`,
        poster: production.assets?.poster?.url ?? null,
        productionDetail: {
          cast: production.cast ?? [],
          director: production.director ?? [],
          releaseYear: production.releaseYear ?? null,
          spokenLanguage: production.spokenLanguage ?? null,
        },
        venue: {
          name: venue?.name ?? "Unknown venue",
          address: venue?.address
            ? `${venue.address.street}, ${venue.address.postalCode} ${venue.address.city}`
            : "",
        },
        subtitles: e.attributes?.subtitles ?? [],
        startDate: start,
        dateKey: toDateKey(start),
        tags: e.attributes?.tags ?? [],
        ...labels,
      };
    })

    .sort((a, b) => a.startDate - b.startDate);

  // group everything by date, for the index page
  const byDay = Object.groupBy(all, (e) => e.dateKey);

  return { all, byDay };
}
