class CountryHelper {
    GetCountries() {
        return ['US', 'UK', 'Thailand'];
    }
}

const _instance = new CountryHelper();
module.exports = {
    Instance : _instance
}