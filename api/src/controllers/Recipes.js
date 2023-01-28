const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const axios = require("axios");

// consumimos la api y la guardo en data api
const getApi = async () => {
  const ApiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const dataApi = await ApiUrl.results?.map((res) => {
    return {
      id: res.id,
      name: res.title,
      summary: res.summary,
      level: res.healthScore,
      Image: res.image,
      Steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });
  return dataApi;
};

// Buscando todo En La DB
const getDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//trae las id desde la api

const ApiById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/{id}/information${API_KEY}`
  );
};

//

// busca id desde db

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// fucion de api y db

const getRecipesAll = async () => {
  const apiData = await getApi();
  const DbData = await getDb();
  //El método concat() se utiliza para fusionar dos o más matrices
  const Data = apiData.concat(DbData);

  return Data;
};

module.exports = {
  getApi,
  getDb,
  ApiById,
  getDbById,
  getRecipesAll,
};
