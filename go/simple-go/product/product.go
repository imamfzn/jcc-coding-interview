package product

type Product struct {
	ID     int    `json:"id"`
	Name   string `json:"name" form:"name"`
	Price  int    `json:"price" form:"price"`
	Stock  int    `json:"stock" form:"stock"`
	Active bool   `json:"active"`
}

func SoldUpdate(p Product) {
	p.Active = false
	p.Price = -1
	p.Stock = 0
}
