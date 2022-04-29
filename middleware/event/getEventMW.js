const requireOption = require("../requireOption");

/**
 * Betölt egy eseményt.
 */
module.exports = function (objectrepository) {
    const EventModel = requireOption(objectrepository, "EventModel");

    return function (req, res, next) {
        EventModel.findOne({_id: req.params.eventid}, (error, event) => {
            if (error || !event) {
                return next();
            }

            res.locals.event = event;
            return next();
        })
    };
};