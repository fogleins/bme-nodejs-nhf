/**
 * Töröl egy eseményt.
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.event === "undefined") {
            return next();
        }

        res.locals.event.remove(error => {
            if (error) {
                return next(error);
            }
            return res.redirect("/events");
        });
    };
};