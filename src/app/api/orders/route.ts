import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function GET() {
	const orders = await prisma.order.findMany()
	return NextResponse.json(orders)
}

export async function POST(request: Request) {
	const data = await request.json()

	const { items, total } = data
	if (!items) {
		NextResponse.json({ message: 'Missing items' })
	}

	const order = await prisma.order.create({
		data: {
			status: 'pending',
			items: {
				create: items
			},
			total: total
		}
	})

	return NextResponse.json({ orderId: order.id })
}
