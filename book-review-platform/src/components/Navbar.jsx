export default function Navbar({
	activeView,
	watchlistCount,
	searchInput,
	onSearchChange,
	onSearch,
	onDiscover,
	onWatchlist,
	onHome,
}) {
	return (
		<header className="topbar">
			<a className="wordmark" href="#home" onClick={onHome} aria-label="Shelflight home">
				<span className="wordmark-mark">S</span>
				<span>shelf<span className="wordmark-light">light</span></span>
			</a>
			<nav className="main-nav" aria-label="Main navigation">
				<button className={activeView === 'discover' ? 'nav-link active' : 'nav-link'} type="button" onClick={onDiscover}>Discover</button>
				<button className={activeView === 'watchlist' ? 'nav-link active' : 'nav-link'} type="button" onClick={onWatchlist}>
					My watchlist <span className="nav-count">{watchlistCount}</span>
				</button>
			</nav>
			<form className="search-form" onSubmit={onSearch} role="search">
				<label className="visually-hidden" htmlFor="book-search">Search books and authors</label>
				<span aria-hidden="true">⌕</span>
				<input
					id="book-search"
					type="search"
					placeholder="Titles, authors, stories..."
					value={searchInput}
					onChange={(event) => onSearchChange(event.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
		</header>
	)
}
