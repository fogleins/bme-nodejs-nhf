/**
 * Betölti az összes eseményt.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};