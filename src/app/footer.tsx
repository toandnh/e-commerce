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
				'bg-neutral-300 dark:bg-neutral-800 p-16 border-t border-neutral-200 dark:border-neutral-700',
				text.className
			)}
		>
			This is a footer
		</div>
	)
}
