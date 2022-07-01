const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  })
  .then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include: [Product]
  }).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  updateTarget = await Category.findByPk(req.params.id)
  updateTarget.set(
    req.body
  )
  updateTarget.save()
  return res.json(updateTarget)
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
     id: req.params.id
    }
  }).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
  // delete a category by its `id` value
});

module.exports = router;
