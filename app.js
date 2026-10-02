const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------- MOVIE DATA ----------
const movies = [
  {
    id: "inception",
    title: "Inception",
    rating: 8.8,
    duration: "2h 28m",
    genre: "Sci-Fi, Thriller",
    language: "English",
    certificate: "UA",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    banner: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    rating: 8.7,
    duration: "2h 49m",
    genre: "Sci-Fi, Drama",
    language: "English",
    certificate: "UA",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    banner: "https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    rating: 9.0,
    duration: "2h 32m",
    genre: "Action, Crime",
    language: "English",
    certificate: "UA",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    banner: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests.",
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    rating: 8.4,
    duration: "3h 1m",
    genre: "Action, Adventure",
    language: "English",
    certificate: "UA",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    banner: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    description:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance.",
  },
  {
    id: "joker",
    title: "Joker",
    rating: 8.4,
    duration: "2h 2m",
    genre: "Crime, Drama",
    language: "English",
    certificate: "A",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    banner: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral.",
  },
  {
    id: "parasite",
    title: "Parasite",
    rating: 8.5,
    duration: "2h 12m",
    genre: "Thriller, Drama",
    language: "Korean",
    certificate: "A",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    banner: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
];

const showtimes = ["10:00 AM", "1:30 PM", "4:15 PM", "6:45 PM", "9:30 PM"];

const getMovie = (id) => movies.find((m) => m.id === id);

// ---------- LAYOUT ----------
const layout = (title, body, extraHead = "") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | MovieBook</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .seat { transition: all .15s ease; }
  </style>
  ${extraHead}
</head>
<body class="bg-gray-100 text-gray-900 pb-20">
  ${body}
</body>
</html>`;

// ---------- HEADER + BOTTOM NAV ----------
const header = `
<header class="bg-gradient-to-r from-red-600 to-pink-600 text-white sticky top-0 z-40 shadow-lg">
  <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🎬</span>
      <h1 class="font-bold text-xl tracking-tight">MovieBook</h1>
    </div>
    <div class="flex items-center gap-3 text-sm">
      <span>📍 Bengaluru</span>
    </div>
  </div>
</header>`;

const bottomNav = `
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
  <div class="max-w-md mx-auto grid grid-cols-3 text-center text-xs">
    <a href="/" class="py-3 text-red-600 font-semibold flex flex-col items-center gap-0.5">
      <span class="text-xl">🏠</span> Home
    </a>
    <a href="/my-bookings" class="py-3 text-gray-500 flex flex-col items-center gap-0.5">
      <span class="text-xl">🎟️</span> Bookings
    </a>
    <a href="#" class="py-3 text-gray-500 flex flex-col items-center gap-0.5">
      <span class="text-xl">👤</span> Profile
    </a>
  </div>
</nav>`;

// ---------- HOME PAGE ----------
app.get("/", (req, res) => {
  const cards = movies
    .map(
      (m) => `
    <a href="/movie/${m.id}" class="flex-shrink-0 w-40 snap-start">
      <div class="relative rounded-xl overflow-hidden shadow-md bg-gray-800">
        <img src="${m.poster}" alt="${m.title}" class="w-full h-60 object-cover" />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
          <div class="flex items-center gap-1 text-yellow-400 text-xs font-bold">
            ⭐ ${m.rating}
          </div>
        </div>
      </div>
      <h3 class="mt-2 font-semibold text-sm truncate">${m.title}</h3>
      <p class="text-xs text-gray-500">${m.genre.split(",")[0]} • ${m.certificate}</p>
    </a>
  `
    )
    .join("");

  const body = `
  ${header}
  <div class="max-w-md mx-auto">
    <!-- Hero Banner -->
    <div class="relative">
      <img src="https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" class="w-full h-48 object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
        <div class="text-white">
          <span class="text-xs bg-red-600 px-2 py-0.5 rounded font-semibold">PREMIERE</span>
          <h2 class="text-xl font-bold mt-1">Avengers: Endgame</h2>
          <p class="text-sm opacity-90">Now Showing in Theatres</p>
        </div>
      </div>
    </div>

    <!-- Now Showing -->
    <section class="mt-6 px-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-bold text-lg">Now Showing</h2>
        <a href="#" class="text-red-600 text-sm font-semibold">See all</a>
      </div>
      <div class="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
        ${cards}
      </div>
    </section>

    <!-- Top Rated -->
    <section class="mt-6 px-4">
      <h2 class="font-bold text-lg mb-3">Top Rated</h2>
      <div class="space-y-3">
        ${movies
          .slice()
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3)
          .map(
            (m) => `
          <a href="/movie/${m.id}" class="flex gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
            <img src="${m.poster}" class="w-16 h-24 rounded-lg object-cover" />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold truncate">${m.title}</h3>
              <p class="text-xs text-gray-500 mt-0.5">${m.genre}</p>
              <p class="text-xs text-gray-500 mt-0.5">${m.duration} • ${m.certificate}</p>
              <div class="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-1">
                ⭐ ${m.rating}
              </div>
            </div>
          </a>
        `
          )
          .join("")}
      </div>
    </section>

    <div class="h-6"></div>
  </div>
  ${bottomNav}
  `;

  res.send(layout("Home", body));
});

// ---------- MOVIE DETAIL ----------
app.get("/movie/:id", (req, res) => {
  const movie = getMovie(req.params.id);
  if (!movie) return res.redirect("/");

  const times = showtimes
    .map(
      (t) => `
    <button class="border border-gray-300 rounded-lg py-2 text-sm font-semibold text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition">
      ${t}
    </button>
  `
    )
    .join("");

  const body = `
  ${header}
  <div class="max-w-md mx-auto">
    <!-- Banner -->
    <div class="relative">
      <img src="${movie.banner}" class="w-full h-56 object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4 flex gap-3 items-end">
        <img src="${movie.poster}" class="w-24 h-36 rounded-lg object-cover shadow-lg border-2 border-white" />
        <div class="text-white flex-1">
          <h1 class="text-xl font-bold leading-tight">${movie.title}</h1>
          <div class="flex items-center gap-2 text-xs mt-2">
            <span class="bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">⭐ ${movie.rating}</span>
            <span>${movie.certificate}</span>
            <span>•</span>
            <span>${movie.duration}</span>
          </div>
          <p class="text-xs opacity-80 mt-1">${movie.language}</p>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <div class="flex flex-wrap gap-2 mb-4">
        ${movie.genre
          .split(",")
          .map(
            (g) =>
              `<span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">${g.trim()}</span>`
          )
          .join("")}
      </div>

      <p class="text-sm text-gray-600 leading-relaxed">${movie.description}</p>

      <!-- Showtimes -->
      <h3 class="font-bold mt-6 mb-3">Select Showtime</h3>
      <div class="grid grid-cols-3 gap-2">
        ${times}
      </div>

      <!-- Book Button -->
      <a href="/seats/${movie.id}"
         class="block mt-6 bg-red-600 text-white text-center font-bold py-3 rounded-xl shadow-lg hover:bg-red-700 transition">
        🎟️ Book Tickets
      </a>
    </div>

    <div class="h-20"></div>
  </div>
  ${bottomNav}
  `;

  res.send(layout(movie.title, body));
});

// ---------- SEAT SELECTION ----------
app.get("/seats/:id", (req, res) => {
  const movie = getMovie(req.params.id);
  if (!movie) return res.redirect("/");

  // Build seat grid: 6 rows x 8 cols
  const rows = ["A", "B", "C", "D", "E", "F"];
  const bookedSeats = ["A3", "B5", "D2", "E7", "F4"]; // pre-booked (simulated)

  let seatHTML = "";
  rows.forEach((row) => {
    let rowSeats = "";
    for (let i = 1; i <= 8; i++) {
      const seatId = `${row}${i}`;
      const isBooked = bookedSeats.includes(seatId);
      rowSeats += `
        <button
          type="button"
          data-seat="${seatId}"
          ${isBooked ? "disabled" : ""}
          class="seat w-8 h-8 rounded text-xs font-bold ${
            isBooked
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-red-100"
          }">
          ${i}
        </button>`;
    }
    seatHTML += `
      <div class="flex items-center gap-2 mb-2">
        <span class="w-5 text-xs font-bold text-gray-500">${row}</span>
        <div class="flex gap-1.5">${rowSeats}</div>
      </div>`;
  });

  const body = `
  ${header}
  <div class="max-w-md mx-auto p-4">
    <h2 class="font-bold text-lg">${movie.title}</h2>
    <p class="text-xs text-gray-500 mb-4">Screen 1 • Today, 6:45 PM</p>

    <!-- Screen -->
    <div class="my-6">
      <div class="h-2 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-full"></div>
      <p class="text-center text-xs text-gray-500 mt-2">SCREEN THIS WAY</p>
    </div>

    <!-- Seats -->
    <div class="flex flex-col items-center">
      ${seatHTML}
    </div>

    <!-- Legend -->
    <div class="flex justify-center gap-4 text-xs mt-6">
      <div class="flex items-center gap-1"><span class="w-3 h-3 bg-white border border-gray-300 rounded"></span> Available</div>
      <div class="flex items-center gap-1"><span class="w-3 h-3 bg-red-500 rounded"></span> Selected</div>
      <div class="flex items-center gap-1"><span class="w-3 h-3 bg-gray-300 rounded"></span> Booked</div>
    </div>

    <!-- Summary bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
      <div class="max-w-md mx-auto flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500">Selected: <span id="count">0</span> seats</p>
          <p class="text-lg font-bold">₹<span id="total">0</span></p>
        </div>
        <button id="bookBtn" disabled
          class="bg-gray-300 text-white font-bold px-6 py-3 rounded-xl cursor-not-allowed transition">
          Proceed
        </button>
      </div>
    </div>
    <div class="h-24"></div>
  </div>

  <script>
    const TICKET_PRICE = 200;
    const selected = new Set();

    document.querySelectorAll('.seat:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const seat = btn.dataset.seat;
        if (selected.has(seat)) {
          selected.delete(seat);
          btn.classList.remove('bg-red-500','text-white');
          btn.classList.add('bg-white','text-gray-700','border','border-gray-300');
        } else {
          selected.add(seat);
          btn.classList.add('bg-red-500','text-white');
          btn.classList.remove('bg-white','text-gray-700','border','border-gray-300');
        }
        document.getElementById('count').textContent = selected.size;
        document.getElementById('total').textContent = selected.size * TICKET_PRICE;
        const bookBtn = document.getElementById('bookBtn');
        if (selected.size > 0) {
          bookBtn.disabled = false;
          bookBtn.classList.remove('bg-gray-300','cursor-not-allowed');
          bookBtn.classList.add('bg-red-600','hover:bg-red-700','cursor-pointer');
        } else {
          bookBtn.disabled = true;
          bookBtn.classList.add('bg-gray-300','cursor-not-allowed');
          bookBtn.classList.remove('bg-red-600','hover:bg-red-700','cursor-pointer');
        }
      });
    });

    document.getElementById('bookBtn').addEventListener('click', () => {
      const seats = Array.from(selected).join(',');
      const total = selected.size * TICKET_PRICE;
      const url = '/confirm/${movie.id}?seats=' + encodeURIComponent(seats) + '&total=' + total;
      window.location.href = url;
    });
  </script>
  `;

  res.send(layout("Select Seats", body));
});

// ---------- CONFIRMATION ----------
app.get("/confirm/:id", (req, res) => {
  const movie = getMovie(req.params.id);
  if (!movie) return res.redirect("/");

  const seats = (req.query.seats || "").split(",").filter(Boolean);
  const total = req.query.total || 0;
  const bookingId = "MB" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const body = `
  ${header}
  <div class="max-w-md mx-auto p-4">
    <!-- Success icon -->
    <div class="text-center mt-6">
      <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <span class="text-4xl">✅</span>
      </div>
      <h1 class="text-2xl font-bold mt-4 text-green-600">Booking Confirmed!</h1>
      <p class="text-sm text-gray-500 mt-1">Your tickets have been booked</p>
    </div>

    <!-- Ticket -->
    <div class="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="flex gap-3 p-4">
        <img src="${movie.poster}" class="w-16 h-24 rounded-lg object-cover" />
        <div class="flex-1">
          <h3 class="font-bold">${movie.title}</h3>
          <p class="text-xs text-gray-500 mt-1">${movie.language} • ${movie.certificate}</p>
          <p class="text-xs text-gray-500 mt-1">Screen 1 • Today, 6:45 PM</p>
        </div>
      </div>
      <div class="border-t border-dashed border-gray-300"></div>
      <div class="p-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p class="text-xs text-gray-500">Booking ID</p>
          <p class="font-bold">${bookingId}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Seats</p>
          <p class="font-bold">${seats.join(", ") || "—"}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Total Paid</p>
          <p class="font-bold text-green-600">₹${total}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Date</p>
          <p class="font-bold">${new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-3 mt-6">
      <a href="/" class="bg-white border border-gray-300 text-center font-semibold py-3 rounded-xl">
        🏠 Home
      </a>
      <button onclick="window.print()" class="bg-red-600 text-white text-center font-semibold py-3 rounded-xl">
        📥 Download
      </button>
    </div>
    <div class="h-20"></div>
  </div>
  ${bottomNav}
  `;

  res.send(layout("Booking Confirmed", body));
});

// ---------- MY BOOKINGS ----------
app.get("/my-bookings", (req, res) => {
  const body = `
  ${header}
  <div class="max-w-md mx-auto p-4">
    <h1 class="font-bold text-lg mb-4">My Bookings</h1>
    <div class="bg-white rounded-xl p-6 text-center shadow-sm">
      <div class="text-5xl mb-2">🎟️</div>
      <p class="text-gray-500 text-sm">Your past bookings will appear here.</p>
      <p class="text-xs text-gray-400 mt-2">(Demo — not yet persistent)</p>
    </div>
    <div class="h-20"></div>
  </div>
  ${bottomNav}
  `;
  res.send(layout("My Bookings", body));
});

// ---------- START ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🎬 MovieBook running on port ${PORT}`);
});
