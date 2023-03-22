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

router.get('/:id', (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
});

router.post('/', (req, res) => {
	// create a new category
});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
});

router.delete('/:id', (req, res) => {
	// delete a category by its `id` value
});

module.exports = router;
