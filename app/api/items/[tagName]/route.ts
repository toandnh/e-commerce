import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function GET(
	request: Request,
	{ params }: { params: { tagName: string } }
) {
	const name = params.tagName
	if (!name) {
		return NextResponse.json({ message: 'Missing params' })
	}

	const foundTag = await prisma.tag.findUnique({
		where: { name },
		select: { id: true, name: false }
	})
	if (!foundTag) {
		return NextResponse.json({ message: `Tag '${name}' not found` })
	}

	const itemsWithTag = await prisma.itemsTags.findMany({
		take: 5,
		skip: 0,
		where: { tagId: foundTag.id }
	})
	return NextResponse.json(itemsWithTag)
}
