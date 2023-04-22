import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function POST(
	request: Request,
	{ params }: { params: { query: string } }
) {
	if (!params.query) {
		return NextResponse.json({ message: 'Missing query' })
	}

	const foundTags = await prisma.tag.findMany({
		where: {
			name: {
				search: params.query
			}
		}
	})
	if (!foundTags) {
		return NextResponse.json({
			message: `Tag '${params.query}' not found`
		})
	}

	return NextResponse.json(foundTags)
}
