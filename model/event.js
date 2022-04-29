const Schema = require("mongoose").Schema
const db = require("../db")

const mongoose = require("mongoose");

const Event = db.model("Event", {
    name: String,
    startTime: Date,
    endTime: Date,
    location: String,
    photographersNeeded: Number,
    photographersApplied: [{
        type: Schema.Types.ObjectId,
        ref: "Photographer"
    }], // idegen kulcsok tömbje a jelentkezett fotósokra
    comment: String
})

module.exports = Event