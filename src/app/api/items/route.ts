import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function GET() {
	const items = await prisma.item.findMany()
	return NextResponse.json(items)
}
