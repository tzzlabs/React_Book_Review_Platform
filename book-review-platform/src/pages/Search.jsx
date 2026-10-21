import BookShelf from '../components/BookShelf'

export default function Search({
	books,
	genre,
	reviews,
	watchlist,
	loading,
	error,
	onRetry,
	onGenreChange,
	onSave,
	onOpen,
}) {
	return (
		<BookShelf
			books={books}
			genre={genre}
			view="search"
			title="Search results"
			loading={loading}
			error={error}
			reviews={reviews}
			watchlist={watchlist}
			onGenreChange={onGenreChange}
			onRetry={onRetry}
			onSave={onSave}
			onOpen={onOpen}
		/>
	)
}
