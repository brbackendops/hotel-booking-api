'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
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
      })
    }
  }
  Hotels.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key:"id"
      }
    },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.ARRAY(DataTypes.STRING),
    type: DataTypes.STRING,
    adultCount: DataTypes.INTEGER,
    childCount: DataTypes.INTEGER,
    facilities: DataTypes.ARRAY(DataTypes.STRING),
    rating: DataTypes.FLOAT,
    location: DataTypes.STRING,
    pricePerNight: DataTypes.FLOAT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    lastUpdated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Hotels',
    hooks: {
      beforeCreate: async (hotel,options) => {
        hotel.lastUpdated = new Date()
      }
    }
  });
  return Hotels;
};