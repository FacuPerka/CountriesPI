const { Router } = require('express');
const router = Router();
const { Country, Activity } = require('../db.js');
const { getActivities } = require('./Controllers');

// Ruta para crear una actividad
router.post('/', async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { countryId, name, difficulty, duration, season } = req.body;

  try {
    // Crear la actividad en la base de datos
    const createActivity = await Activity.create({
      countryId,
      name,
      difficulty,
      duration,
      season
    });

    // Obtener los países asociados mediante el countryId proporcionado
    const countries = await Country.findAll({
      where: { id: countryId }
    });

    // Asociar los países a la actividad
    await createActivity.addCountries(countries);

    // Devolver la actividad creada con los países asociados
    return res.status(201).send(createActivity);
  } catch (error) {
    // Manejar errores y enviar una respuesta de error adecuada
    console.error('Error creating activity:', error);
    return res.status(500).send('Error creating activity');
  }
});

// Ruta para obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    // Obtener las actividades
    const activities = await getActivities();

    // Devolver las actividades como respuesta
    return res.status(200).send(activities);
  } catch (error) {
    // Manejar errores y enviar una respuesta de error adecuada
    console.error('Error retrieving activities:', error);
    return res.status(500).send('Error retrieving activities');
  }
});

module.exports = router;
