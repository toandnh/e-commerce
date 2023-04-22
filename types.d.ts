type Item = {
	id: number
	title: string
	image: string
	description: string | null
	price: number
}

type ItemCart = {
	title: string
	image: string
	price: number
	amount: number
}

type Tag = {
	id: number
	name: string
}

type Order = {
	id: number
	createdAt: string
	status: string
	items: ItemCart[]
	total: number
	customerId: number | null
}
