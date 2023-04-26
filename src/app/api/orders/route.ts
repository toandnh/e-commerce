import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '../auth/[...nextauth]/route'

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

	const session = await getServerSession(authOptions)

	let orderData
	if (session?.user) {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email! }
		})

		orderData = {
			status: 'pending',
			userId: user!.id,
			items: {
				create: items
			},
			total: total
		}
	} else {
		orderData = {
			status: 'pending',
			items: {
				create: items
			},
			total: total
		}
	}

	const order = await prisma.order.create({
		data: orderData
	})

	return NextResponse.json({ orderId: order.id })
}

export async function PATCH(request: Request) {
	const data = await request.json()
	const { email, orderId } = data

	const user = await prisma.user.findUnique({ where: { email } })

	const updatedOrder = await prisma.order.update({
		where: {
			id: orderId
		},
		data: {
			userId: user!.id
		}
	})

	return NextResponse.json({
		message: `Order ${orderId} has been assigned to user ${user!.id}`
	})
}
