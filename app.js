const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const medioPago = req.body.medioPago;
    const modulos = req.body.modulos;

    // Función para asignar un valor a cada módulo según el curso seleccionado
    const calcularTotal = (curso, modulos, medioPago) => {
        let total = 0;
        for (let i = 0; i < modulos.length; i++) {
            let costoModulo = 0;
            switch (curso) {
                case 'Java':
                    if (modulos[i] === 'Básico') {
                        costoModulo = 1200;
                    } else if (modulos[i] === 'Intermedio' || modulos[i] === 'Avanzado') {
                        costoModulo = 1200;
                    }
                    break;
                case 'PHP':
                    if (modulos[i] === 'Básico') {
                        costoModulo = 800;
                    } else if (modulos[i] === 'Intermedio' || modulos[i] === 'Avanzado') {
                        costoModulo = 800;
                    }
                    break;
                case '.NET':
                    if (modulos[i] === 'Básico') {
                        costoModulo = 1500;
                    } else if (modulos[i] === 'Intermedio' || modulos[i] === 'Avanzado') {
                        costoModulo = 1500;
                    }
                    break;
            }

            // Aplicar descuento del 10% si se paga en efectivo
            if (medioPago === 'Efectivo') {
                costoModulo *= 0.9; // Aplicar descuento del 10%
            }

            total += costoModulo;
        }
        return total;
    };

    // Calcular el total a pagar
    const totalPagar = calcularTotal(curso, modulos, medioPago);
    
    // Lógica para procesar los datos y mostrar la vista de confirmación
    res.render('confirmacion', { curso, medioPago, modulos, totalPagar });
});

// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

