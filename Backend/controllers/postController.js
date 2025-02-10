const { Post, User, Tag } = require('../models');

exports.getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { tag, userId, role, page = 1, limit = 9 } = req.query;
        const offset = (page - 1) * limit;

        const include = [{
            model: User,
            as: 'author',
            attributes: ['id','username','role']
        }];

        if (tag) {
            include.push({
                model: Tag,
                as: 'tags',
                where: { name: tag },
                through: { attributes: [] }
            });
        }

        const whereCondition = { category };
        if (role === 'user') {
            whereCondition.userId = userId;
        }

        const { count, rows: posts } = await Post.findAndCountAll({
            where: whereCondition,
            include,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return res.json({
            posts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalItems: count
        });
    } catch (error) {
        console.error('Error in getPostsByCategory:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getRecentPosts = async (req, res) => {
    try {
        const { page = 1, limit = 9 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: posts } = await Post.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'role']
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.json({
            posts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalItems: count
        });
    } catch (error) {
        console.error('Error in getRecentPosts:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const {
            title,
            content,
            category,
            imageBase64_1,
            imageBase64_2,
            imageBase64_3,
            imageBase64_4,
            brand_intro,
            brand_history,
            brand_philosophy,
            review_intro,
            review_driving,
            review_design,
            car_years,
            car_bodytype,
            car_engines,
            news_text
        } = req.body;

        const { userId, role } = req.user;

        let image1 = null, image2 = null, image3 = null, image4 = null;
        if (imageBase64_1) image1 = Buffer.from(imageBase64_1, 'base64');
        if (imageBase64_2) image2 = Buffer.from(imageBase64_2, 'base64');
        if (imageBase64_3) image3 = Buffer.from(imageBase64_3, 'base64');
        if (imageBase64_4) image4 = Buffer.from(imageBase64_4, 'base64');

        if (category === 'reviews') {
            if (role !== 'user' && role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
        } else {
            if (role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        const newPost = await Post.create({
            title,
            content,
            category,
            image1,
            image2,
            image3,
            image4,
            userId,
            brand_intro,
            brand_history,
            brand_philosophy,
            review_intro,
            review_driving,
            review_design,
            car_years,
            car_bodytype,
            car_engines,
            news_text
        });

        return res.status(201).json({ message: 'Post created', postId: newPost.id });
    } catch (error) {
        console.error('Error in createPost:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            category,
            brand_intro,
            brand_history,
            brand_philosophy,
            review_intro,
            review_driving,
            review_design,
            car_years,
            car_bodytype,
            car_engines,
            news_text
        } = req.body;

        const { userId, role } = req.user;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.category === 'reviews') {
            if (post.userId !== userId && role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
        } else {
            if (role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        const getValue = (newValue, oldValue) => {
            if (newValue === undefined) return oldValue;
            if (newValue === null && oldValue) return oldValue;
            return newValue;
        };

        const updates = {
            title: getValue(title, post.title),
            content: getValue(content, post.content),
            category: getValue(category, post.category),
            brand_intro: getValue(brand_intro, post.brand_intro),
            brand_history: getValue(brand_history, post.brand_history),
            brand_philosophy: getValue(brand_philosophy, post.brand_philosophy),
            review_intro: getValue(review_intro, post.review_intro),
            review_driving: getValue(review_driving, post.review_driving),
            review_design: getValue(review_design, post.review_design),
            car_years: getValue(car_years, post.car_years),
            car_bodytype: getValue(car_bodytype, post.car_bodytype),
            car_engines: getValue(car_engines, post.car_engines),
            news_text: getValue(news_text, post.news_text)
        };

        await post.update(updates);

        return res.json({ message: 'Post updated' });
    } catch (error) {
        console.error('Error in updatePost:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, role } = req.user;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.category === 'reviews') {
            if (post.userId === userId || role === 'admin') {
                await post.destroy();
                return res.json({ message: 'Review deleted' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        } else {
            if (role === 'admin') {
                await post.destroy();
                return res.json({ message: 'Post deleted' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }
    } catch (error) {
        console.error('Error in deletePost:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.params.userId;

        const reviews = await Post.findAll({
            where: {
                userId: userId,
                category: 'reviews'
            },
            include: [{
                model: User,
                attributes: ['username']
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.json(reviews);
    } catch (error) {
        console.error('Error in getUserReviews:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
