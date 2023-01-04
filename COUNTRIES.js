/**
 * @param {string} country - вместо пробелов используется + (северный судан - South+Sudan)
 * @description Возвращает адрес запроса для страны
 * @returns {Array}
 */
const getServerPath = (country) => [
    `https://www.numbeo.com/cost-of-living/country_result.jsp?country=${country}&displayCurrency=USD`,
    country
]

const COUNTRIES = [
    getServerPath('Turkey'),
    getServerPath('Germany')
]

export default COUNTRIES