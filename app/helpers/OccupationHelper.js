class OccupationHelper {
    GetOccupations() {
        return ['Police', 'PostMan', 'Engineer'];
    }
}

const _instance = new OccupationHelper();
module.exports = {
    Instance : _instance
}