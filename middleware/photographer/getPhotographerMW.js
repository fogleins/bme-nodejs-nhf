const requireOption = require('../requireOption');

/**
 * Betölt egy fotóst.
 */
module.exports = function (objectrepository) {
    const PhotographerModel = requireOption(objectrepository, "PhotographerModel");

    return function (req, res, next) {
        PhotographerModel.findOne({_id: req.params.photographerid}, (error, photographer) => {
            if (error || !photographer) {
                return next(error);
            }

            res.locals.photographer = photographer;
            return next();
        })
    };
};