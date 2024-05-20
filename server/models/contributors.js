module.exports = (sequelize,DataTypes) => {
    const contributors  = sequelize.define("contributors",{
        id : {
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey: true
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false
        }

    });

    return contributors
};

