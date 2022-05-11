const requireOption = require('../requireOption');

/**
 * Eltávolítja a kiválasztott fotóst az eseményre jelentkezett fotósok közül.
 */
module.exports = function (objectrepository) {
    const EventModel = requireOption(objectrepository, "EventModel");

    return function (req, res, next) {
        if (typeof res.locals.event === "undefined") {
            return next();
        }

        EventModel.updateOne(
            {_id: res.locals.event.id},
            {$pull: {photographersApplied: res.locals.photographer.id}},
            (error) => {
                if (error) {
                    return next(error);
                }
            }
        );
        return res.redirect("/event/details/" + res.locals.event.id);
    };
};