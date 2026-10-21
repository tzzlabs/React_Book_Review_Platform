import BookCard from './BookCard'
import GenreFilter from './GenreFilter'

export default function BookShelf({
  books,
  genre,
  view,
  title,
  loading,
  error,
  reviews,
  watchlist,
  onGenreChange,
  onRetry,
  onSave,
  onOpen,
  onDiscover,
}) {
  const emptyTitle = view === 'watchlist' ? 'Your shelf is waiting.' : 'No stories found this time.'
  const emptyDescription = view === 'watchlist'
    ? 'Save a book that catches your eye and it will be here.'
    : view === 'search'
      ? 'Try another title or author.'
      : 'Try another genre and see where it takes you.'

  return (
    <section className="discovery-section">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">A WORLD OF STORIES</p>
          <h2>{title}</h2>
        </div>
        <p className="result-count">{loading ? 'Finding your next read…' : `${books.length} ${books.length === 1 ? 'book' : 'books'}`}</p>
      </div>
      <GenreFilter genre={genre} view={view} onGenreChange={onGenreChange} />

      {error && (
        <div className="state-message" role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>Try again</button>
        </div>
      )}
      {loading && (
        <div className="book-grid" aria-label="Loading books">
          {Array.from({ length: 6 }, (_, index) => <div className="book-skeleton" key={index}><div /><span /><span /></div>)}
        </div>
      )}
      {!loading && !error && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              key={book.key ?? book.title}
              book={book}
              saved={watchlist.some((item) => item.key === book.key || item.title === book.title)}
              review={reviews[book.key ?? book.title]}
              onSave={onSave}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          <span className="empty-mark">S.</span>
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
          {view === 'watchlist' && <button className="button-primary" type="button" onClick={onDiscover}>Explore books</button>}
        </div>
      )}
    </section>
  )
}