import './globals.css'

import Wrapper from './wrapper'

import Topbar from './topbar'
import Footer from './footer'

export const metadata = {
	title: 'Another E Commerce Site',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const content = (
		<div className='flex flex-row'>
			<div>
				<div className='flex flex-col p-4 sm:p-6 2xl:p-8'>
					<Topbar />
					{children}
				</div>
				<Footer />
			</div>
		</div>
	)

	return (
		<html lang='en' suppressHydrationWarning>
			<body className='bg-neutral-100 dark:bg-neutral-900 min-w-[300px] flex flex-col overflow-y-auto'>
				<Wrapper content={content} />
			</body>
		</html>
	)
}
