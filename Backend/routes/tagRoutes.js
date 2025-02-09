const express = require('express');
const router = express.Router();
const { Tag, Post, PostTag } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newTag = await Tag.create({ name, description });
        return res.status(201).json(newTag);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll();
        return res.json(tags);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id, {
            include: [
                {
                    model: Post,
                    as: 'posts',
                    through: { attributes: [] }
                }
            ]
        });
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        return res.json(tag);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { id } = req.params;
        const { name, description } = req.body;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        await tag.update({
            name: name ?? tag.name,
            description: description ?? tag.description
        });

        return res.json({ message: 'Tag updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        await tag.destroy();
        return res.json({ message: 'Tag deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:id/assign/:postId', authMiddleware, async (req, res) => {
    try {
        const { role, userId } = req.user;
        if (role === 'guest') {
            return res.status(403).json({ error: 'Guests cannot assign tags' });
        }

        const { id, postId } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await PostTag.create({
            tagId: id,
            postId: postId,
            taggedByUserId: userId
        });

        return res.json({ message: 'Tag assigned to post successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id/unassign/:postId', authMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role === 'guest') {
            return res.status(403).json({ error: 'Guests cannot unassign tags' });
        }

        const { id, postId } = req.params;
        const postTag = await PostTag.findOne({
            where: {
                tagId: id,
                postId: postId
            }
        });
        if (!postTag) {
            return res.status(404).json({ error: 'Tag not assigned to this post' });
        }

        await postTag.destroy();
        return res.json({ message: 'Tag unassigned from post' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
