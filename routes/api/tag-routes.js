const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tags = await Tag.findAll({
			attributes: ['id', 'tag_name'],
			include: [
				{
					model: Product,
					attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
					through: 'ProductTag',
				},
			],
		});
		if (tags) {
			res.status(200).json(tags);
		} else {
			res.status(404).json({
				message: 'No Tags found!',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tag = await Tag.findByPk(req.params.id, {
			attributes: ['id', 'tag_name'],
			include: [
				{
					model: Product,
					attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
					through: 'ProductTag',
				},
			],
		});
		if (tag) {
			res.status(200).json(tag);
		} else {
			res.status(404).json({
				message: 'No Tag id found!',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const newTag = await Tag.create(req.body);
		if (newTag) {
			res.status(200).json(newTag);
		} else {
			res.status(404).json({
				message: 'Unable to create Tag',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const updatedTag = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (updatedTag) {
			res.status(200).json(updatedTag);
		} else {
			res.status(404).json({
				message: 'Unable to update Tag',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const deletedTag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (deletedTag) {
			res.status(200).json(deletedTag);
		} else {
			res.status(404).json({
				message: 'Unable to delete Tag',
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Internal server error' });
	}
});

module.exports = router;
