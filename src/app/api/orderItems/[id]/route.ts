import {NextResponse} from 'next/server'

import prisma from '@/prisma/client'

export async function GET(request: Request, {params}: {params: {id: string}}) {
	const orderId = parseInt(params.id)
	if (!params.id) {
		return NextResponse.json({message: `Missing Order Id ${params.id}`})
	}

	const foundItems = await prisma.orderItem.findMany({
		where: {orderId: orderId}
	})
	if (!foundItems) {
		return NextResponse.json({
			message: `Order '${orderId}' not found`
		})
	}

	return NextResponse.json(foundItems)
}
