'use strict';

module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'Tags'
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Post, {
            through: models.PostTag,
            foreignKey: 'tagId',
            otherKey: 'postId',
            as: 'posts'
        });
    };

    return Tag;
};
