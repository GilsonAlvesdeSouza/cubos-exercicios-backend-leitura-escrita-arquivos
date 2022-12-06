interface ProductInterface {
  id: number | null;
  name: string;
  value: number;
}

const products: Array<ProductInterface> = [
  { id: 1, name: "Teclado mecânico Keychron K2", value: 100000 },
  { id: 2, name: "TV Samsung 4K", value: 129900 },
  { id: 3, name: "Notebook Dell", value: 399990 },
  { id: 4, name: "Mouse MX Master 3", value: 23000 },
  { id: 5, name: "Teclado Keychron K8", value: 50000 },
  { id: 6, name: "Cabo USB 2 Metros", value: 1990 },
  { id: 7, name: "Carregador portátil", value: 4590 },
  { id: 8, name: "Webcam C920s", value: 80000 },
  { id: 9, name: "Monitor LG 29 FHD", value: 129900 },
];

class ProductService {
  getAll() {
    return products;
  }

  getById(id: number) {
    const product = products.find((product) => product.id === id);
    return product;
  }
}

export { ProductService };
