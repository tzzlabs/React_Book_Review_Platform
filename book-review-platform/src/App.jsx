import { useEffect, useState } from 'react'
import { getBooksByGenre, searchBooks } from './services/bookApi'
import { getBookKey, getCover, readStorage } from './services/bookUtils'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import BookDetails from './pages/BookDetails'
import './App.css'

const WATCHLIST_KEY = 'shelflight-watchlist'
const REVIEWS_KEY = 'shelflight-reviews'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="footer-wordmark" href="#home">shelflight</a>
      <span>For the love of getting lost in a good story.</span>
      <a href="https://openlibrary.org" target="_blank" rel="noreferrer">Books provided by Open Library ↗</a>
    </footer>
  )
}

function App() {
  const [genre, setGenre] = useState('fantasy')
  const [activeView, setActiveView] = useState('discover')
  const [bookResult, setBookResult] = useState({ key: '', books: [], error: '' })
  const [watchlist, setWatchlist] = useState(() => readStorage(WATCHLIST_KEY, []))
  const [reviews, setReviews] = useState(() => readStorage(REVIEWS_KEY, {}))
  const [searchInput, setSearchInput] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [selectedBook, setSelectedBook] = useState(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    if (activeView === 'watchlist') return undefined

    let current = true
    const requestKey = `${genre}|${submittedSearch}|${retryCount}`
    const request = submittedSearch ? searchBooks(submittedSearch) : getBooksByGenre(genre)

    request
      .then((data) => {
        if (!current) return
        setBookResult({ key: requestKey, books: data.works ?? data.docs ?? [], error: '' })
      })
      .catch(() => {
        if (!current) return
        setBookResult({ key: requestKey, books: [], error: 'We could not reach Open Library. Check your connection and try again.' })
      })

    return () => { current = false }
  }, [activeView, genre, submittedSearch, retryCount])

  const requestKey = `${genre}|${submittedSearch}|${retryCount}`
  const loading = activeView === 'discover' && bookResult.key !== requestKey
  const error = activeView === 'discover' && bookResult.key === requestKey ? bookResult.error : ''
  const visibleBooks = activeView === 'watchlist'
    ? watchlist.filter((book) => genre === 'all' || book.subject?.some((subject) => subject.toLowerCase().includes(genre.replace('_', ' '))) || book.subject?.includes(genre))
    : bookResult.books
  const featuredBook = genre === 'manga'
    ? bookResult.books.find((book) => /naruto|bleach|death note|evangelion/i.test(book.title) && getCover(book, 'L')) ?? bookResult.books.find((book) => getCover(book, 'L')) ?? bookResult.books[0]
    : bookResult.books.find((book) => getCover(book, 'L')) ?? bookResult.books[0]
  function toggleWatchlist(book) {
    const key = getBookKey(book)
    setWatchlist((current) => current.some((item) => getBookKey(item) === key)
      ? current.filter((item) => getBookKey(item) !== key)
      : [...current, book])
  }

  function openBook(book) {
    const existingReview = reviews[getBookKey(book)]
    setReviewRating(existingReview?.rating ?? 0)
    setReviewText(existingReview?.text ?? '')
    setSelectedBook(book)
  }

  function submitSearch(event) {
    event.preventDefault()
    setSubmittedSearch(searchInput.trim())
    setActiveView('discover')
  }

  function selectGenre(value) {
    setGenre(value)
    setSubmittedSearch('')
    setSearchInput('')
    setActiveView('discover')
  }

  function saveReview(event) {
    event.preventDefault()
    if (!selectedBook || !reviewRating) return
    setReviews((current) => ({
      ...current,
      [getBookKey(selectedBook)]: { rating: reviewRating, text: reviewText.trim() },
    }))
    setSelectedBook(null)
  }

  return (
    <div className="app-shell">
      <Navbar
        activeView={activeView}
        watchlistCount={watchlist.length}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onSearch={submitSearch}
        onDiscover={() => { if (genre === 'all') setGenre('fantasy'); setActiveView('discover') }}
        onWatchlist={() => { setActiveView('watchlist'); setGenre('all'); setSubmittedSearch('') }}
        onHome={() => { setActiveView('discover'); selectGenre('fantasy') }}
      />
      <main id="home">
        {activeView === 'watchlist' ? (
          <Watchlist
            books={visibleBooks}
            genre={genre}
            reviews={reviews}
            watchlist={watchlist}
            onGenreChange={setGenre}
            onSave={toggleWatchlist}
            onOpen={openBook}
            onDiscover={() => setActiveView('discover')}
          />
        ) : submittedSearch ? (
          <Search
            books={visibleBooks}
            genre={genre}
            reviews={reviews}
            watchlist={watchlist}
            loading={loading}
            error={error}
            onRetry={() => setRetryCount((count) => count + 1)}
            onGenreChange={selectGenre}
            onSave={toggleWatchlist}
            onOpen={openBook}
          />
        ) : (
          <Home
            books={visibleBooks}
            featuredBook={featuredBook}
            genre={genre}
            reviews={reviews}
            watchlist={watchlist}
            loading={loading}
            error={error}
            onRetry={() => setRetryCount((count) => count + 1)}
            onGenreChange={selectGenre}
            onSave={toggleWatchlist}
            onOpen={openBook}
          />
        )}
      </main>
      <SiteFooter />
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          review={reviews[getBookKey(selectedBook)]}
          saved={watchlist.some((book) => getBookKey(book) === getBookKey(selectedBook))}
          rating={reviewRating}
          reviewText={reviewText}
          onRatingChange={setReviewRating}
          onReviewTextChange={setReviewText}
          onSave={toggleWatchlist}
          onSubmit={saveReview}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}

export default App
