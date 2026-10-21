export const GENRES = [
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Fiction', value: 'fiction' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Romance', value: 'romance' },
  { label: 'Science fiction', value: 'science_fiction' },
  { label: 'Manga', value: 'manga' },
  { label: 'Graphic novels', value: 'graphic_novels' },
  { label: 'History', value: 'history' },
]

export function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function getCover(book, size = 'M') {
  const coverId = book.cover_i ?? book.cover_id
  return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : null
}

export function getAuthors(book) {
  if (book.author_name?.length) return book.author_name.join(', ')
  if (book.authors?.length) return book.authors.map((author) => author.name).join(', ')
  return 'Unknown author'
}

export function getBookKey(book) {
  return book.key ?? book.title
}