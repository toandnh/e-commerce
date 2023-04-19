import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

import EmblaCarousel from './emblaCarousel'

type ItemIds = {
	itemId: number
}

async function getItemsByIds(ids: number[]): Promise<Item[]> {
	const items = await prisma.item.findMany({
		where: { id: { in: ids } },
		select: {
			id: true,
			title: true,
			image: true,
			description: true,
			price: true
		}
	})
	return items
}

async function getItemIdsWithTag(
	tag: string
): Promise<ItemIds[] | NextResponse> {
	const foundTag = await prisma.tag.findUnique({
		where: { name: tag },
		select: { id: true, name: false }
	})
	if (!foundTag) {
		return NextResponse.json({ message: `Tag '${tag}' not found` })
	}

	const itemIdsWithTag = await prisma.itemsTags.findMany({
		take: 10,
		where: { tagId: foundTag.id },
		select: { itemId: true }
	})
	return itemIdsWithTag
}

export default async function Carousel({ tag }: { tag: string }) {
	const res = await getItemIdsWithTag(tag)

	const itemIdsWithTag: number[] = []
	if (res instanceof Array) {
		res.map((id) => itemIdsWithTag.push(id.itemId))
	}

	const items = await getItemsByIds(itemIdsWithTag)

	return <EmblaCarousel category={tag} items={items} />
}
