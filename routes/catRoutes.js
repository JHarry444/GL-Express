const router = require('express').Router();
const { checkContent, checkMethods } = require('../validation');
const { catModel } = require('../db');

router.use('/create', checkMethods(['POST']), checkContent(['application/json']), async (req, res) => {
  const created = await catModel.create(req.body);
  res.status(201).json(created);
});

router.get('/getAll', async (req, res) => res.json(await catModel.find({})));

router.get('/get/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, msg: 'Missing id' });
  if (!(await catModel.exists({ _id: id }))) return next({ status: 404, msg: `No cat found with id ${id}` });
  try {
    const updated = await catModel.findByIdAndUpdate(id, req.query, {
      returnDocument: 'after',
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

router.patch('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, msg: 'Missing id' });
  if (!(await catModel.exists({ _id: id }))) return next({ status: 404, msg: `No cat found with id ${id}` });
  try {
    const updated = await catModel.findByIdAndUpdate(id, req.query, {
      returnDocument: 'after',
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

router.delete('/remove/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next({ status: 400, msg: 'Missing id' });
    if (await catModel.countDocuments({ _id: id }) === 0) return next({ status: 404, msg: `No cat with id ${id}` });

    const deleted = await catModel.findByIdAndDelete(req.params.id);
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
