const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


const sequelize = new Sequelize('WebFarma', 'postgres', 'nk26cdJx', {
  host: 'localhost',
  dialect: 'postgres',
});


const Symptom = sequelize.define('Symptom', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'symptomps',
});


async function fetchAndInsertSymptoms() {
  const baseURL = 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search';
  const params = {
    terms: '',
    df: 'primary_name,synonyms',
    maxList: 1000,
  };

  try {
    const response = await axios.get(baseURL, { params });

    if (response.data && response.data[3] && response.data[3].length > 0) {
      const symptoms = response.data[3];

      const symptomPromises = symptoms.map(async (symptom) => {
        const [primaryName, synonyms] = symptom;
        const newSymptom = {
          id: uuidv4(),
          name: primaryName,
          description: synonyms || 'No description available',
        };
        await Symptom.create(newSymptom);
      });

      await Promise.all(symptomPromises);

      console.log(`Inserted ${symptoms.length} symptoms into the database.`);
    } else {
      console.log('No symptoms found.');
    }
  } catch (error) {
    console.error('Error fetching or inserting symptoms:', error);
  } finally {
    await sequelize.close();
  }
}

sequelize.sync().then(() => {
  fetchAndInsertSymptoms();
});
