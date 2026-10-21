import { GENRES } from '../services/bookUtils'

export default function GenreFilter({ genre, view, onGenreChange }) {
  return (
    <div className="genre-row" aria-label="Filter books by genre">
      {view === 'watchlist' && (
        <button className={genre === 'all' ? 'genre-chip selected' : 'genre-chip'} type="button" onClick={() => onGenreChange('all')}>
          All saved
        </button>
      )}
      {GENRES.map((item) => (
        <button
          key={item.value}
          className={genre === item.value ? 'genre-chip selected' : 'genre-chip'}
          type="button"
          onClick={() => onGenreChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}