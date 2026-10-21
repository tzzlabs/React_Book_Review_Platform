import BookShelf from '../components/BookShelf'
import FeaturedBook from '../components/FeaturedBook'
import { GENRES } from '../services/bookUtils'

export default function Home({
	books,
	featuredBook,
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
	const genreLabel = GENRES.find((item) => item.value === genre)?.label ?? 'the shelves'
	const isFeaturedSaved = featuredBook && watchlist.some((book) => book.key === featuredBook.key)

	return (
		<>
			{featuredBook && !loading && (
				<FeaturedBook
					book={featuredBook}
					genreLabel={genreLabel}
					saved={isFeaturedSaved}
					onOpen={onOpen}
					onSave={onSave}
				/>
			)}
			<BookShelf
				books={books}
				genre={genre}
				view="discover"
				title="Find your kind of book"
				loading={loading}
				error={error}
				reviews={reviews}
				watchlist={watchlist}
				onGenreChange={onGenreChange}
				onRetry={onRetry}
				onSave={onSave}
				onOpen={onOpen}
			/>
		</>
	)
}
