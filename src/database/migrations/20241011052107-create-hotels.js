'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key: 'id'
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false        
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false         
      },
      adultCount:{
        type: Sequelize.INTEGER,
        allowNull: false         
      },
      childCount:{
        type: Sequelize.INTEGER,
        allowNull: false         
      },
      facilities:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false         
      },
      rating:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      location:{
        type: Sequelize.STRING,
        allowNull: false
      },
      pricePerNight:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      images:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      lastUpdated:{
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hotels');
  }
};