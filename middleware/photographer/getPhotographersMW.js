/*
 * Betölti az összes fotóst.
 */

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const PhotographerModel = requireOption(objectrepository, "PhotographerModel");

    return function (req, res, next) {
        PhotographerModel.find({}, (err, photographers) => {
            if (err) {
                return next();
            }

            res.locals.photographers = photographers;
            return next();
        });
    };
};