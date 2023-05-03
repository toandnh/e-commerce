import { Popover } from '@headlessui/react'

import SearchResult from './searchResult'

export default function SearchPopover({ items }: { items: Item[] }) {
	return (
		<Popover className='relative z-10'>
			<Popover.Panel
				static
				className='absolute left-1/2 w-full -translate-x-1/2 -mt-4'
			>
				<div className='bg-white dark:bg-neutral-700 flex flex-col justify-center items-center gap-2 p-2 rounded-md overflow-hidden'>
					{items &&
						items.map((item: Item) => {
							return <SearchResult key={item.title} item={item} />
						})}
				</div>
			</Popover.Panel>
		</Popover>
	)
}
