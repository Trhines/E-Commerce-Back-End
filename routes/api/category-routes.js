const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include:[{ model: Product }],
    });
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{ model: Product }],
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData)
  } catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newCategory)
  } catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: req.params.id},
      );
      res.status(200).json(updatedCategory)
  } catch(err){
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({
      where: req.params.id
    })

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(deletedCategory)
  } catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
