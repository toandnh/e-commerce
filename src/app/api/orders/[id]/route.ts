import {NextResponse} from 'next/server'

import prisma from '@/prisma/client'

export async function GET(request: Request, {params}: {params: {id: string}}) {
	const orderId = parseInt(params.id)
	if (!params.id) {
		return NextResponse.json({message: `Missing Order Id ${params.id}`})
	}

	const foundOrder = await prisma.order.findUnique({
		where: {id: orderId}
	})
	if (!foundOrder) {
		return NextResponse.json({
			message: `Order '${orderId}' not found`
		})
	}

	return NextResponse.json(foundOrder)
}
