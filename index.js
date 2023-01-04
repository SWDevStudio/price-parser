import axios from "axios";
import * as cheerio from 'cheerio';
import {writeFileSync} from 'fs';
import COUNTRIES from "./COUNTRIES.js";
import FIELD_FOR_PARSE from "./FIELD_FOR_PARSE.js";

async function parsePrices(path, countryName) {

    const {data: page} = await axios.get(path)
    const $ = cheerio.load(page)

    const json = {}

    for (let field in FIELD_FOR_PARSE) {
        const count = FIELD_FOR_PARSE[field]

        const priceArea = $(`tr:contains("${field}")`).find('.first_currency').html()

        json[field] = Number((parseFloat(priceArea) * count).toFixed(2))
    }

    let total = 0
    for (const key in json) { total += json[key] }
    json.total = total

    writeFileSync(`base/${countryName.replaceAll('+', ' ')}.json`, JSON.stringify(json))
}



COUNTRIES.forEach((country) => parsePrices(country[0], country[1]))