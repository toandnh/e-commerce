import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function GET(
	request: Request,
	{ params }: { params: { title: string } }
) {
	if (!params.title) {
		return NextResponse.json({ message: 'Missing Product Title' })
	}

	const foundItem = await prisma.item.findUnique({
		where: { title: params.title }
	})
	if (!foundItem) {
		return NextResponse.json({
			message: `Product Title '${params.title}' not found`
		})
	}

	return NextResponse.json(foundItem)
}
