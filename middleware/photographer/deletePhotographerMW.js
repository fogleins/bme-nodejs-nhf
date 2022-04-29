/**
 * Töröl egy fotóst az adatbázisból.
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.photographer === "undefined") {
            return next();
        }

        res.locals.photographer.remove(error => {
            if (error) {
                return next(error);
            }
            return res.redirect("/photographers")
        });
    };
};