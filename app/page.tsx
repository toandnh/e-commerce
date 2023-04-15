import Explore from './explore'

export const revalidate = 3600 //revalidate this page every hour

export default function Home() {
	return (
		<main className='flex flex-col'>
			{/* @ts-expect-error Async Server Component */}
			<Explore />
		</main>
	)
}
