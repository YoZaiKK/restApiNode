const express = require("express");
const morgan = require("morgan");

const app = express();
let products = [{ id: 1, name: "Motor", price: 200 }];
const PORT = 3000;
app.listen(PORT);

app.use(morgan("dev"));
app.use(express.json());
// app.use(express.text());

app.get("/products", (req, res) => {
	res.json(products);
});

app.post("/products", (req, res) => {
	const newProduct = { ...req.body, id: products.length + 1 };
	products.push(newProduct);
	res.send("Creando producto");
});

app.put("/products/:id", (req, res) => {
	const newData = req.body;
	const productFound = products.find(
		(product) => product.id === parseInt(req.params.id)
	);
	if (!productFound)
		return res.status(404).send({ message: "Product not found" });
	products = products.map((product) =>
		product.id === parseInt(req.params.id)
			? { ...product, ...newData }
			: product
	);
	res.send({ message: "Product updated successfully" });
	// res.send(products);
	// res.send("Actualizando productos");
});

app.delete("/products/:id", (req, res) => {
	const productFound = products.find(
		(product) => product.id === parseInt(req.params.id)
	);
	if (!productFound)
		return res.status(404).send({ message: "Product not found" });
	products = products.filter(
		(product) => product.id !== parseInt(req.params.id)
	);
	res.send({ message: "Product deleted successfully" });
	// res.send(productFound);
	// res.send("Eliminando productos");
});

app.get("/products/:id", (req, res) => {
	const productFound = products.find(
		(product) => product.id === parseInt(req.params.id)
	);
	if (!productFound)
		return res.status(404).send({ message: "Product not found" });
	res.send(productFound);
});

console.log(`server on port ${PORT}`);
