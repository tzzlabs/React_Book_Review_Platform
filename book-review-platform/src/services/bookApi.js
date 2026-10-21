const BASE_URL = "https://openlibrary.org";

async function fetchBooks(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Open Library returned ${response.status}`);
  return response.json();
}

export const getBooksByGenre = (genre) =>
  fetchBooks(`${BASE_URL}/subjects/${encodeURIComponent(genre)}.json?limit=24`);

export const searchBooks = (query) =>
  fetchBooks(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=24`);