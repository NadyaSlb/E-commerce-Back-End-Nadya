const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  })
  .then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [Product]
  }).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  updateTarget = await Tag.findByPk(req.params.id)
  updateTarget.set(
    req.body
  )
  updateTarget.save()
  return res.json(updateTarget)
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
     id: req.params.id
    }
  }).then((response) => res.json(response))
  .catch((err) => res.status(500).json(err))
});

module.exports = router;
