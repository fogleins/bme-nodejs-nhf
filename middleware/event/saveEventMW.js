const requireOption = require("../requireOption");

/**
 * Elment egy eseményt az adatbázisba.
 */
module.exports = function (objectrepository) {
    const EventModel = requireOption(objectrepository, "EventModel");

    return function (req, res, next) {
        if (typeof req.body.event_name === "undefined" || typeof req.body.event_start_time === "undefined"
            || typeof req.body.event_end_time === "undefined" || typeof req.body.location === "undefined"
            || typeof req.body.photographers_needed === "undefined" || typeof req.body.comment === "undefined") {
            return next();
        }

        if (typeof res.locals.event === "undefined") {
            res.locals.event = new EventModel();
        }

        res.locals.event.name = req.body.event_name;
        res.locals.event.startTime = req.body.event_start_time;
        res.locals.event.endTime = req.body.event_end_time;
        res.locals.event.location = req.body.location;
        res.locals.event.photographersNeeded = req.body.photographers_needed;
        res.locals.event.comment = req.body.comment;

        if (res.locals.event.startTime >= res.locals.event.endTime) {
            console.log("Start time must be before the end time");
            return next();
        } else {
            res.locals.event.save(error => {
                if (error) {
                    return next(error);
                }
                return res.redirect("/events");
            });
        }
    };
};