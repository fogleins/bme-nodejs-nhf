const requireOption = require("../requireOption");

/**
 * Betölti az összes fotóst.
 */
module.exports = function (objectrepository) {
    const PhotographerModel = requireOption(objectrepository, "PhotographerModel");

    return function (req, res, next) {
        PhotographerModel.find({}, (err, photographers) => {
            if (err) {
                return next(err);
            }

            res.locals.photographers = photographers;
            return next();
        });
    };
};