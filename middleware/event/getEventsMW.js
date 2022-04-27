/*
 * Betölti az összes eseményt.
 */

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const EventModel = requireOption(objectrepository, "EventModel");

    return function (req, res, next) {
        EventModel.find({}, (err, events) => {
            if (err) {
                return next();
            }

            res.locals.events = events;
            return next();
        });
    };
};