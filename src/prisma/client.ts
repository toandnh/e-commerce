import { PrismaClient } from '@prisma/client'

export type Order = {
	id: number
	customerId: number | null
	status: string
	items: Item
}

declare global {
	namespace NodeJS {
		interface Global {}
	}
}

interface CustomNodeJsGlobal extends NodeJS.Global {
	prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()
//const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
