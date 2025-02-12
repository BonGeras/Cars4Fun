'use strict';

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM('news','reviews','brands','cars'),
            allowNull: false
        },
        image1: { type: DataTypes.BLOB('long'), allowNull: true },
        image2: { type: DataTypes.BLOB('long'), allowNull: true },
        image3: { type: DataTypes.BLOB('long'), allowNull: true },
        image4: { type: DataTypes.BLOB('long'), allowNull: true },

<<<<<<< HEAD
        brand_intro: { type: DataTypes.TEXT },
        brand_history: { type: DataTypes.TEXT },
        brand_philosophy: { type: DataTypes.TEXT },

        review_intro: { type: DataTypes.TEXT },
        review_driving: { type: DataTypes.TEXT },
        review_design: { type: DataTypes.TEXT },

        car_years: { type: DataTypes.STRING },
        car_bodytype: { type: DataTypes.STRING },
        car_engines: { type: DataTypes.STRING },

        news_text: { type: DataTypes.TEXT }
=======
        brand_intro: { type: DataTypes.TEXT, allowNull: true },
        brand_history: { type: DataTypes.TEXT, allowNull: true },
        brand_philosophy: { type: DataTypes.TEXT, allowNull: true },

        review_intro: { type: DataTypes.TEXT, allowNull: true },
        review_driving: { type: DataTypes.TEXT, allowNull: true },
        review_design: { type: DataTypes.TEXT, allowNull: true },

        car_years: { type: DataTypes.STRING, allowNull: true },
        car_bodytype: { type: DataTypes.STRING, allowNull: true },
        car_engines: { type: DataTypes.STRING, allowNull: true },

        news_text: { type: DataTypes.TEXT, allowNull: true }
>>>>>>> 9de206efb49b8183a0366f9a0d0fc01e86640251
    }, {
        tableName: 'Posts'
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });

        Post.belongsToMany(models.Tag, {
            through: models.PostTag,
            foreignKey: 'postId',
            otherKey: 'tagId',
            as: 'tags'
        });
    };

    return Post;
};
