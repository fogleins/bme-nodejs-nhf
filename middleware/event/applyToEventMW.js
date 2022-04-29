/**
 * Elment egy eseményt az adatbázisba.
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.body.applicant === "undefined" || typeof res.locals.event === "undefined") {
            return next();
        }

        // do not add the same person multiple times
        if (!res.locals.event.photographersApplied.includes(req.body.applicant)) {
            res.locals.event.photographersApplied.push(req.body.applicant);
            res.locals.event.save(error => {
                if (error) {
                    return next(error);
                }
            });
        }
        return res.redirect("/event/details/" + res.locals.event.id);
    };
};