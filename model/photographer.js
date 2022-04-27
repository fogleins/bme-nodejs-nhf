const Schema = require("mongoose").Schema
const db = require("../db")

const Photographer = db.model("Photographer", {
    name: String,
    membershipLevel: String
});

module.exports = Photographer