
module.exports = (sequelize,DataTypes) => {
    const symptomps  = sequelize.define("symptomps",{
        id : {
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey: true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false
        }

    });

    return symptomps
};

