import { useEffect } from 'react'
import { getAuthors, getCover } from '../services/bookUtils'

export default function BookDetails({
	book,
	saved,
	rating,
	reviewText,
	onRatingChange,
	onReviewTextChange,
	onSave,
	onSubmit,
	onClose,
}) {
	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => window.removeEventListener('keydown', closeOnEscape)
	}, [onClose])

	const cover = getCover(book, 'L')

	return (
		<div className="dialog-backdrop">
			<button className="dialog-dismiss" type="button" aria-label="Close book details" onClick={onClose} />
			<section className="book-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
				<button className="dialog-close" type="button" aria-label="Close" onClick={onClose}>×</button>
				<div className="dialog-book">
					{cover ? <img className="dialog-cover" src={cover} alt={`Cover of ${book.title}`} /> : <div className="dialog-cover cover-placeholder">{book.title}</div>}
					<div className="dialog-book-info">
						<p className="section-eyebrow">A BOOK TO GET LOST IN</p>
						<h2 id="dialog-title">{book.title}</h2>
						<p className="dialog-author">by {getAuthors(book)}</p>
						<p className="dialog-meta">{book.first_publish_year ?? 'Publication year unknown'}{book.edition_count ? ` · ${book.edition_count} editions` : ''}</p>
						{book.subject?.length > 0 && <div className="subject-list">{book.subject.slice(0, 4).map((subject) => <span key={subject}>{subject}</span>)}</div>}
						<button className={`save-button dialog-save${saved ? ' is-saved' : ''}`} type="button" onClick={() => onSave(book)}>
							{saved ? '✓ In your watchlist' : '+ Add to watchlist'}
						</button>
					</div>
				</div>
				<form className="review-form" onSubmit={onSubmit}>
					<div className="review-heading">
						<div><p className="section-eyebrow">YOUR READING NOTES</p><h3>Leave a little review</h3></div>
						<span>Just for your shelf</span>
					</div>
					<fieldset className="rating-picker">
						<legend>Your rating</legend>
						{[1, 2, 3, 4, 5].map((value) => (
							<button
								key={value}
								className={value <= rating ? 'rating-star active' : 'rating-star'}
								type="button"
								aria-label={`${value} out of 5 stars`}
								aria-pressed={value === rating}
								onClick={() => onRatingChange(value)}
							>★</button>
						))}
					</fieldset>
					<label className="visually-hidden" htmlFor="review-text">Your review</label>
					<textarea
						id="review-text"
						rows="3"
						maxLength="500"
						placeholder="What stayed with you?"
						value={reviewText}
						onChange={(event) => onReviewTextChange(event.target.value)}
					/>
					<div className="review-footer">
						<span>{reviewText.length}/500</span>
						<button className="button-primary" type="submit" disabled={!rating}>Save review</button>
					</div>
				</form>
			</section>
		</div>
	)
}
