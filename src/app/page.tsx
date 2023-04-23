import SearchBox from '@/components/search/searchBox'

import Feature from './feature'
import Explore from './explore'

export const revalidate = 3600 //revalidate this page every hour

export default function Home() {
	return (
		<main className='flex flex-col gap-4'>
			<SearchBox />
			{/* @ts-expect-error Async Server Component */}
			<Feature />
			<p className='font-semibold text-xl py-4 mt-4 border-t border-neutral-300 dark:border-neutral-700'>
				Categories
			</p>
			{/* @ts-expect-error Async Server Component */}
			<Explore />
		</main>
	)
}
