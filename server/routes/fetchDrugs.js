const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


const sequelize = new Sequelize('WebFarma', 'postgres', 'nk26cdJx', {
  host: 'localhost',
  dialect: 'postgres',
});


const Drug = sequelize.define('Drug', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  containing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'drugs', 
  
});


async function fetchAndInsertDrugs() {
  const baseURL = 'https://api.fda.gov/drug/ndc.json';
  const limit = 1000;

  try {

    const response = await axios.get(baseURL, { params: { limit } });
    if (response.data.results) {
      const drugs = response.data.results;


      const drugPromises = drugs.map(async (drug) => {
        const newDrug = {
          id: uuidv4(),
          name: drug.brand_name,
          containing: drug.generic_name,
        };
        await Drug.create(newDrug);
      });


      await Promise.all(drugPromises);

      console.log(`Inserted ${drugs.length} drugs into the database.`);
    } else {
      console.log('No drugs found.');
    }
  } catch (error) {
    console.error('Error fetching or inserting drugs:', error);
  } finally {

    await sequelize.close();
  }
}


sequelize.sync().then(() => {
  fetchAndInsertDrugs();
});
