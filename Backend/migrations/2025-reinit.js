'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        try { await queryInterface.dropTable('PostTags'); } catch (e) {}
        try { await queryInterface.dropTable('Tags'); } catch (e) {}
        try { await queryInterface.dropTable('Posts'); } catch (e) {}
        try { await queryInterface.dropTable('Users'); } catch (e) {}

        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM('guest', 'user', 'admin'),
                allowNull: false,
                defaultValue: 'guest'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.createTable('Posts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            category: {
                type: Sequelize.ENUM('news','reviews','brands','cars'),
                allowNull: false
            },
            image1: {
                type: Sequelize.BLOB('long'),
                allowNull: true
            },
            image2: {
                type: Sequelize.BLOB('long'),
                allowNull: true
            },
            image3: {
                type: Sequelize.BLOB('long'),
                allowNull: true
            },
            image4: {
                type: Sequelize.BLOB('long'),
                allowNull: true
            },
            brand_intro: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            brand_history: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            brand_philosophy: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            review_intro: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            review_driving: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            review_design: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            car_years: {
                type: Sequelize.STRING,
                allowNull: true
            },
            car_bodytype: {
                type: Sequelize.STRING,
                allowNull: true
            },
            car_engines: {
                type: Sequelize.STRING,
                allowNull: true
            },
            news_text: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.createTable('Tags', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.createTable('PostTags', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            tagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tags',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            taggedByUserId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PostTags');
        await queryInterface.dropTable('Tags');
        await queryInterface.dropTable('Posts');
        await queryInterface.dropTable('Users');
    }
};
