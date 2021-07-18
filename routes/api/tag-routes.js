const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as:'products' }]
    })
    res.status(200).json(allTags)
  } catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as:'products' }]
    })

    if (!singleTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(singleTag)
  } catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag)
  } catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: req.params.id}
    )
    res.status(200).json(updateTag)
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    })
    res.status(200).json(deleteTag)
  } catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
