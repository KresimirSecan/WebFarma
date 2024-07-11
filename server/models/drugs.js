
module.exports = (sequelize,DataTypes) => {
    const drugs  = sequelize.define("drugs",{
        id : {
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey: true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        containing : {
            type : DataTypes.STRING,
            allowNull : false
        }

    });

    return drugs
};

