/**
 * Töröl egy eseményt.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};