const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const { authenticate } = require('../auth/authenticate');
const responseStatus = require('./responseStatus');

router.get('/', authenticate, async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .select()
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id');
    res.status(responseStatus.success).json(types);
  } catch (error) {
    res.status(responseStatus.serverError).json(error);
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const singleEquipment = await db('equipment')
      .where({ id })
      .select(
        'equipment.id',
        'equipment.type',
        'equipment.equipmentImage',
        'equipment.broken'
      );
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

router.post(
  '/',
  upload.single('equipmentImage'),
  authenticate,
  async (req, res) => {
    try {
      if (req.file === undefined) {
        if (!req.body.type || !req.body.broken) {
          res.status(responseStatus.badRequest).json({
            message:
              "Please enter the type of equipment and whether it's broken."
          });
        } else {
          const ids = await db('equipment').insert(req.body);
          res
            .status(responseStatus.postCreated)
            .json({ message: `New equipmenet added with id: ${ids}` });
        }
      } else {
        const newEquipment = {
          type: req.body.type,
          broken: req.body.broken,
          equipmentImage: req.file.path
        };
        const ids = await db('equipment').insert(newEquipment);
        res
          .status(responseStatus.postCreated)
          .json({ message: `New equipmenet added with id: ${ids}` });
      }
    } catch (error) {
      res
        .status(responseStatus.serverError)
        .json({ errorMessage: 'Unable to get that piece of equipment.' });
    }
  }
);

// router.put(
//   '/:id',
//   upload.single('equipmentImage'),
//   authenticate,
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       if (req.file === undefined) {
//         if (!req.body.type || !req.body.broken) {
//           res.status(responseStatus.badRequest).json({
//             message:
//               "Please enter the type of equipment and whether it's broken."
//           });
//         } else {
//           const ids = await db('equipment')
//             .where({ id })
//             .update(req.body);
//           res
//             .status(responseStatus.postCreated)
//             .json({ message: `Equipment has been updated.` });
//         }
//       } else {
//         const newEquipment = {
//           type: req.body.type,
//           broken: req.body.broken,
//           equipmentImage: req.file.path
//         };
//         const myUpdate = await db('equipment')
//           .where({ id })
//           .update(newEquipment);
//         if (!myUpdate) {
//           res
//             .status(responseStatus.badRequest)
//             .json({ message: 'Please enter a valid ID.' });
//         } else {
//           res
//             .status(responseStatus.success)
//             .json({ messgae: `Equipment has been updated.` });
//         }
//       }
//     } catch (error) {
//       res
//         .status(responseStatus.serverError)
//         .json({ errorMessage: 'Unable to update that piece of equipment.' });
//     }
//   }
// );

router.delete('/:id', authenticate, async (req, res) => {
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
