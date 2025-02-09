'use strict';

module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define('PostTag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id'
            }
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tags',
                key: 'id'
            }
        },
        taggedByUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'PostTags'
    });

    PostTag.associate = (models) => {
        PostTag.belongsTo(models.Post, { foreignKey: 'postId' });
        PostTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
    };

    return PostTag;
};
