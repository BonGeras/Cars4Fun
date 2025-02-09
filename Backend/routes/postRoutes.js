const express = require('express');
const router = express.Router();
const { Post, Tag } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getPostsByCategory,
    createPost,
    updatePost,
    deletePost,
    getRecentPosts
} = require('../controllers/postController');

router.get('/recent', getRecentPosts);
router.get('/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id, {
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    through: { attributes: [] }
                }
            ]
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:category', getPostsByCategory);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
