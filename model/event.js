const schema = require("mongoose").Schema
const db = require("db")

const PhotographerT = require("photographer")

const Event = db.model("Event", {
    name: String,
    startTime: Date,
    endTime: Date,
    location: String,
    photographersNeeded: Number,
    photographersApplied: [ { photographer: PhotographerT } ], // idegen kulcsok tömbje a jelentkezett fotósokra
    comment: String
})

module.exports = Event