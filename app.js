const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let movies = {
  1: { name: "Inception", seats: 50 },
  2: { name: "Interstellar", seats: 40 },
  3: { name: "The Dark Knight", seats: 30 },
};

app.get("/", (req, res) => {
  let list = Object.entries(movies)
    .map(
      ([id, m]) => `
        <li style="margin: 12px 0;">
          <b>${m.name}</b> — ${m.seats} seats available
          <form method="POST" action="/book/${id}" style="display:inline; margin-left: 10px;">
            <button type="submit">Book 1 Ticket</button>
          </form>
        </li>`
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Movie Tickets</title></head>
      <body style="font-family: Arial; max-width: 600px; margin: 40px auto;">
        <h1>🎬 Movie Ticket Booking</h1>
        <ul style="list-style: none; padding: 0;">${list}</ul>
      </body>
    </html>
  `);
});

app.post("/book/:id", (req, res) => {
  const id = req.params.id;
  if (movies[id] && movies[id].seats > 0) {
    movies[id].seats -= 1;
  }
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
