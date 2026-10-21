import BookShelf from '../components/BookShelf'

export default function Watchlist({ books, genre, reviews, watchlist, onGenreChange, onSave, onOpen, onDiscover }) {
  return (
    <BookShelf
      books={books}
      genre={genre}
      view="watchlist"
      title="Your watchlist"
      loading={false}
      error=""
      reviews={reviews}
      watchlist={watchlist}
      onGenreChange={onGenreChange}
      onSave={onSave}
      onOpen={onOpen}
      onDiscover={onDiscover}
    />
  )
}