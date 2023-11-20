const request = require('supertest');
const app = require('../../index.js'); // Ajusta la ruta según la estructura de tu proyecto

/*
  Prueba unitaria GET /profesor.
  Hace peticion de todos los profesores.
*/
describe('GET /profesor', () => {
  test('Debería medir el tiempo de respuesta', async () => {
    const response = await request(app).get('/profesor');
    expect(response.status).toBe(200);
  });
});

/*
  Prueba unitaria DELETE /profesor:id
  Elimina un profesor por su ID.
*/
describe('DELETE /profesor/:id', () => {
    test('Debería eliminar un profesor por ID', async () => {
      const responseEliminacion = await request(app).delete(`/profesor/${118630094}`);
      expect(responseEliminacion.status).toBe(200); 
    });
});
/*
  Prueba unitaria POST /comentario
  Comenta una actividad.
*/
describe('POST /comentario', () => {
    test('Debería devolver código 200 al agregar un comentario', async () => {
      const comentarioData = {
        descripcion: 'probando comentario sin que exista comentarios previos 2',
        fecha: "17-05-2023 18: 17: 54",
        autor: 'Felipe Carvajal Arrieta',
        idRespuesta: null,
        idActividad: '64656eb244d4381cbed20392',
      };
      const response = await request(app)
        .post('/comentario')
        .send(comentarioData)
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
    });
});

/*
  Prueba unitaria GET /chat:id
  Obtiene el chat del usuario con el :id.
*/
describe('GET /chat/:id', () => {
  test('Debería devolver el chat con el ID proporcionado', async () => {
    const response = await request(app)
      .get(`/chat/${"646283fc77703da69cbe4b2b"}`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
});
/*
  Prueba unitaria POST /inicio/:email/:password
  Login.
*/
describe('POST /inicio/:email/:password', () => {
  test('Debería devolver el número proporcionado', async () => {
    
    const response = await request(app)
      .post(`/inicio/feobando@estudiantec.cr/12345678`)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
});
/*
  Prueba unitaria  Falta idActividad POST /comentario
  Intenta hacer un comentario sin idActividad.
*/
describe('POST. Falta idActividad /comentario', () => {
  test('Deberia retornar un codigo de actividad faltante.', async () => {
    const comentarioData = {
      descripcion: 'probando comentario sin que exista comentarios previos 2',
      fecha: "17-05-2023 18: 17: 54",
      autor: 'Felipe Carvajal Arrieta',
      idRespuesta: null,
      idActividad: '',//Falta esto: 64656eb244d4381cbed20392
    };
    const response = await request(app)
      .post('/comentario')
      .send(comentarioData)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });
});
/*
  Prueba unitaria  Falta fecha POST /comentario
  Intenta hacer un comentario sin fecha.
*/
describe('POST. Falta fecha /comentario', () => {
  test('Debería retornar un codigo de fecha faltante.', async () => {
    const comentarioData = {
      descripcion: 'probando comentario sin que exista comentarios previos 2',
      fecha: "",//17-05-2023 18: 17: 54"
      autor: 'Felipe Carvajal Arrieta',
      idRespuesta: null,
      idActividad: '64656eb244d4381cbed20392'
    };
    const response = await request(app)
      .post('/comentario')
      .send(comentarioData)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });
});

describe('POST. Falta autor /comentario', () => {
  test('Debería retornar un codigo de autor faltante.', async () => {
    const comentarioData = {
      descripcion: 'probando comentario sin que exista comentarios previos 2',
      fecha: "17-05-2023 18: 17: 54",
      autor: '',//Felipe Carvajal Arrieta
      idRespuesta: null,
      idActividad: '64656eb244d4381cbed20392'
    };
    const response = await request(app)
      .post('/comentario')
      .send(comentarioData)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });
});