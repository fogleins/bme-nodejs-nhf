// common
const renderMW = require("../middleware/renderMW")

// event
const deleteEventMW = require("../middleware/event/deleteEventMW")
const getEventMW = require("../middleware/event/getEventMW")
const getEventsMW = require("../middleware/event/getEventsMW")
const getPhotographersForEventMW = require("../middleware/event/getPhotographersForEventMW")
const saveEventMW = require("../middleware/event/saveEventMW")

// photographer
const deletePhotographerMW = require("../middleware/photographer/deletePhotographerMW")
const getPhotographerMW = require("../middleware/photographer/getPhotographerMW")
const getPhotographersMW = require("../middleware/photographer/getPhotographersMW")
const savePhotographerMW = require("../middleware/photographer/savePhotographerMW")

module.exports = function (app) {
    const objRepo = {}

    app.use("/",
        // ez majd átirányít a(z) /events-re
        getEventsMW(objRepo),
        renderMW(objRepo, "events")
    )

    app.use("/events",
        getEventsMW(objRepo),
        renderMW(objRepo, "events")
    )

    app.use("/event/new",
        saveEventMW(objRepo),
        renderMW(objRepo, "edit_or_create_event")
    )

    app.use("/event/edit/:eventid",
        getEventsMW(objRepo),
        getPhotographersForEventMW(objRepo),
        saveEventMW(objRepo),
        renderMW(objRepo, "edit_or_create_event")
    )

    app.get("/event/delete/:eventid",
        getEventMW(objRepo),
        deleteEventMW(objRepo)
    )

    app.get("/event/details/:eventid",
        getEventMW(objRepo),
        renderMW(objRepo, "event_details")
    )

    app.get("/photographers",
        getPhotographersMW(objRepo),
        renderMW(objRepo, "photographers")
    )

    app.use("/photographer/new",
        savePhotographerMW(objRepo),
        renderMW(objRepo, "edit_or_add_photographer")
    )

    app.use("/photographer/edit/:photographerid",
        getPhotographerMW(objRepo),
        savePhotographerMW(objRepo),
        renderMW(objRepo, "edit_or_add_photographer")
    )

    app.get("/photographer/delete/:photographerid",
        getPhotographerMW(objRepo),
        deletePhotographerMW(objRepo)
    )

}