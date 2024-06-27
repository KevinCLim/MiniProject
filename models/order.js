module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      products: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
  
    return Order;
  };