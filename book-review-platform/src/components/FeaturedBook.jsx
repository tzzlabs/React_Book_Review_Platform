import { getAuthors, getCover } from '../services/bookUtils'

export default function FeaturedBook({ book, genreLabel, saved, onOpen, onSave }) {
  const cover = getCover(book, 'L')

  return (
    <section className="feature" aria-label="Featured book">
      <div className="feature-image" style={{ backgroundImage: cover ? `url(${cover})` : undefined }} />
      <div className="feature-content">
        <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</p>
        <p className="feature-kicker">A little something from {genreLabel}</p>
        <h1>{book.title}</h1>
        <p className="feature-author">by {getAuthors(book)}</p>
        <p className="feature-description">Some stories stay with you long after the last page. Find one that feels like yours.</p>
        <div className="feature-actions">
          <button className="button-primary" type="button" onClick={() => onOpen(book)}>Discover this book</button>
          <button className="button-secondary" type="button" onClick={() => onSave(book)}>{saved ? '✓ In your watchlist' : '+ Add to watchlist'}</button>
        </div>
      </div>
      <span className="feature-index">A SHELFLIGHT PICK <span>01 / 01</span></span>
    </section>
  )
}