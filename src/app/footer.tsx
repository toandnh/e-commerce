import { Orbitron } from 'next/font/google'

import clsx from 'clsx'

const text = Orbitron({
	subsets: ['latin'],
	weight: ['400']
})

export default function Footer() {
	return (
		<div
			className={clsx(
				'bg-neutral-300 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-16 px-4 sm:px-6 2xl:px-10',
				text.className
			)}
		>
			This is a footer
		</div>
	)
}
