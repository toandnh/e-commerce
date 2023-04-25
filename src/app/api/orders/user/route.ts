import { NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const email = searchParams.get('email')
	if (!email) {
		return NextResponse.json({ message: 'User Email Missing' })
	}

	const user = await prisma.user.findUnique({
		where: { email }
	})
	if (!user) return NextResponse.json({ message: 'User not found' })

	const orders = await prisma.order.findMany({ where: { userId: user.id } })
	return NextResponse.json(orders)
}
