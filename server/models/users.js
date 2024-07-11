const users = require("./users");

module.exports = (sequelize,DataTypes) => {
    const users  = sequelize.define("users",{
        id : {
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey: true
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        picture: {
            type: DataTypes.BLOB, 
            allowNull: true
        }

    });


    return users
};

