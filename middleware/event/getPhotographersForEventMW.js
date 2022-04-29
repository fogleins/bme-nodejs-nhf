const requireOption = require('../requireOption');

/**
 * Betölti az adott eseményre már jelentkezett fotósokat.
 */
module.exports = function (objectrepository) {
    const PhotographerModel = requireOption(objectrepository, "PhotographerModel");

    return function (req, res, next) {
        if (typeof res.locals.event === "undefined") {
            return next();
        }
        res.locals.photographersApplied = [];
        let queryIds = [];
        for (let photographerApplied of res.locals.event.photographersApplied) {
            queryIds.push({_id: photographerApplied});
        }

        PhotographerModel.find({
            "$or": queryIds
        }, (error, photographers) => {
            res.locals.photographersApplied = photographers;
            return next();
        });
    };
};