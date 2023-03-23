const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categories = await Category.findAll({
			attributes: ['id', 'category_name'],
			include: [
				{
					model: Product,
					attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
				},
			],
		});
		if (categories) {
			res.status(200).json(categories);
		} else {
			res.status(404).json({
				message: 'No categories found!',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const category = await Category.findByPk(req.params.id, {
			attributes: ['id', 'category_name'],
			include: [
				{
					model: Product,
					attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
				},
			],
		});
		if (category) {
			res.status(200).json(category);
		} else {
			res.status(404).json({
				message: 'No category id found!',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const newCategory = await Category.create(req.body);
		if (newCategory) {
			res.status(200).json(newCategory);
		} else {
			res.status(404).json({
				message: 'Unable to create category',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const updatedCategory = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (updatedCategory) {
			res.status(200).json(updatedCategory);
		} else {
			res.status(404).json({
				message: 'Unable to update category',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const deletedCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (deletedCategory) {
			res.status(200).json(deletedCategory);
		} else {
			res.status(404).json({
				message: 'Unable to delete category',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

module.exports = router;
