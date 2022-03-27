/**
 * Megjeleníti az értékekkel feltöltött template-eket html-ként
 */

module.exports = function(objectrepository, viewName) {
    return function(req, res) {
        res.render(viewName);
    };
};