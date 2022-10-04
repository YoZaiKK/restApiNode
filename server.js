const express = require("express");
const morgan = require("morgan");

const app = express();
const products = [{ id: 1, name: "Motor", price: 200 }];
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
	res.send("Creando productos");
});
app.put("/products", (req, res) => {
	res.send("Actualizando productos");
});
app.delete("/products", (req, res) => {
	res.send("Eleiminando productos");
});
app.get("/products/:id", (req, res) => {
	const productFound = products.find((product) => product.id == req.params.id);
	// console.log((productFound)?productFound: 'No se encontró producto');
	if (!productFound)
		return res.status(404).send({ message: "Product not found" });
	res.send(productFound);
});

console.log(`server on port ${PORT}`);
