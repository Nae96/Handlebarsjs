const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos.json");

// Prendo el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
// app.use('/public', express.static(__dirname + '/public'));
// Configuracion del motor
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// Fin config motor
app.get("/", (req, res) => {
  res.render("formulario");
});

app.post("/productos", async (req, res) => {
  const { body } = req;
  const { title, price, thumbnail } = body;
  const producto = { title, price: parseInt(price), thumbnail };
  await contenedor.save(producto);
  res.redirect("/");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  if (productos.length !== 0) {
    res.render("productslist", { productos });
  } else {
    res.render("errorPlantilla");
  }
});


	
	// const server = app.listen(8080, () => {
	//   console.log(`Servidor http iniciado en el puerto ${server.address().port}`);
	// });
	// server.on("error", (error) => {
	//   console.log(`Error en el servidor ${error}`);
	// });
	
