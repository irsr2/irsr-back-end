const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500
};

router.get('/', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .select('*')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id');
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleEquipment = await db('equipment').where({ id });
    if (singleEquipment.length === 0) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'Please enter a valid ID.' });
    } else {
      res.status(responseStatus.success).json(singleEquipment);
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that piece of equipment.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEquipment = req.body;
    if (
      newEquipment.type &&
      (newEquipment.broken === 0 || newEquipment.broken === 1)
    ) {
      const ids = await db('equipment').insert(newEquipment);
      res
        .status(responseStatus.postCreated)
        .json({ message: `New equipmenet added with id: ${ids}` });
    } else {
      res.status(responseStatus.badRequest).json({
        message: "Please enter the type of equipment and whether it's broken."
      });
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to get that piece of equipment.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const myUpdate = await db('equipment')
      .where({ id })
      .update(changes);
    if (!myUpdate) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'Please enter a valid ID.' });
    } else {
      res
        .status(responseStatus.success)
        .json({ messgae: `ID ${changes.id} has been updated.` });
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to update that piece of equipment.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await db('equipment')
      .where({ id })
      .delete();
    if (!deleteResponse) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'Please enter a valid ID.' });
    } else {
      res
        .status(responseStatus.success)
        .json({ messgae: `ID ${id} has been deleted.` });
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ errorMessage: 'Unable to delete that equipment.' });
  }
});

module.exports = router;
