/*
 * Elment egy fotóst az adatbázisba.
 */

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const PhotographerModel = requireOption(objectrepository, "PhotographerModel");

    return function (req, res, next) {
        if (typeof req.body.name === "undefined" || req.body.membershipLevel === "undefined") {
            return next();
        }

        if (typeof res.locals.photographer === "undefined") {
            res.locals.photographer = new PhotographerModel();
        }
        res.locals.photographer.name = req.body.name;
        res.locals.photographer.membershipLevel = req.body.membershipLevel;

        res.locals.photographer.save(error => {
            if (error) {
                return next(error);
            }
            return res.redirect("/photographers");
        });
    };
};