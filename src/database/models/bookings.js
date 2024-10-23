'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'id',
        constraints: false
      });

      this.belongsTo(models.Hotels,{
        foreignKey: 'id',
        constraints: false
      })
    }
  }

  Bookings.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    hotelId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Hotels',
        key: 'id'
      }
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    adultCount: {
      type: DataTypes.INTEGER
    },
    childCount: {
      type: DataTypes.INTEGER
    },
    checkIn: {
      type: DataTypes.STRING
    },
    checkout: {
      type: DataTypes.STRING
    },
    totalCost: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'Bookings',
    hooks: {
      beforeCreate: async(bookings,options) => {
        
      },
    }
  });
  return Bookings;
};