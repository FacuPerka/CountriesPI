const { Country, Activity } = require("../db.js");
const axios = require("axios");


const getInfo = async () => {
    try {
        const url = await axios.get("https://rest-countries.up.railway.app/v3/all");
        const apiInfo = await url.data.map((country) => {
        return {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[0],
            continent: country.region,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            
        };
        });

        const save = () => {
        apiInfo.map((ele) => {
            Country.findOrCreate({
            where: {
                name: ele.name,
                id: ele.id,
            },
            defaults: {
                continent: ele.continent,
                flag: ele.flag,
                capital: ele.capital,
                subregion: ele.subregion,
                area: ele.area,
                population: ele.population,
            },
            }).catch((error) => {
            console.log(error);
            });
        });
        };

        save();
        return apiInfo;
    } catch (error) {
        return Error({ message: error.message });
    }
    };

    const getDbInfo = async () => {
    try {
        await getInfo();
        const aux = await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
            attributes: [],
            },
        },
        });
        return aux;
    } catch (error) {
        return Error({ message: error.message });
    }
    };

    const getActivities = async () => {
    try {
        const get = await Activity.findAll();
        return get;
    } catch (error) {
        return Error({ message: error.message });
    }
    };

    module.exports = {
    getDbInfo,
    getActivities,
    };

    //Guardar datos en arreglo, en vez de hacer peticion, escritura y peticions.