import { getAuthors, getCover } from '../services/bookUtils'

export default function BookCard({ book, saved, review, onSave, onOpen }) {
	const cover = getCover(book)

	return (
		<article className="book-card">
			<button className="book-cover-button" type="button" onClick={() => onOpen(book)} aria-label={`View ${book.title}`}>
				{cover ? <img className="book-cover" src={cover} alt={`Cover of ${book.title}`} loading="lazy" /> : <span className="cover-placeholder">{book.title}</span>}
				<span className="cover-action">View details</span>
			</button>
			<div className="book-card-info">
				<button className="book-title" type="button" onClick={() => onOpen(book)}>{book.title}</button>
				<p className="book-author">{getAuthors(book)}</p>
				<div className="book-meta">
					<span>{book.first_publish_year ?? 'Year unknown'}</span>
					{review?.rating ? <span className="personal-rating">Your rating {review.rating}/5</span> : book.ratings_average ? <span>★ {book.ratings_average.toFixed(1)}</span> : null}
				</div>
				<button className={`save-button${saved ? ' is-saved' : ''}`} type="button" onClick={() => onSave(book)} aria-label={saved ? `Remove ${book.title} from watchlist` : `Add ${book.title} to watchlist`}>
					{saved ? '✓ In your watchlist' : '+ Add to watchlist'}
				</button>
			</div>
		</article>
	)
}
