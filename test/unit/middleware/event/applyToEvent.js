const expect = require('chai').expect;
const applyToEventMW = require('../../../../middleware/event/applyToEventMW');

describe('applyToEvent middleware ', function () {
    const mw = applyToEventMW({})

    it('should redirect to the event details if the application was successful', function (done) {
        mw(
            {
                // req
                body: {
                    applicant: "first"
                }
            }, {
                // res
                locals: {
                    event: {
                        photographersApplied: ["first", "second"],
                        save: (callback) => {
                            callback(null)
                        },
                        id: "1"
                    }
                },
                redirect: target => {
                    expect(target).to.be.eql("/event/details/1")
                    done()
                }
            },
            error => {
                // intentionally left blank
            })
    })

    it('should call next on db error', function (done) {
        mw(
            {
                // req
                body: {
                    applicant: "random photographer"
                }
            }, {
                // res
                locals: {
                    event: {
                        photographersApplied: ["first", "second"],
                        save: (callback) => {
                            callback("some error")
                        },
                        id: "1"
                    }
                },
                redirect: target => {
                    expect(target).to.be.eql("/event/details/1")
                }
            },
            error => {
                expect(error).to.be.eql("some error")
                done()
            })
    })

    // lényegében megegyezik az előzővel, mert adatbázis művelet (és így db hiba is)
    // csak akkor lehet, ha a jelentkező még nem szerepel a jelentkezettek között
    it('should call next if the photographer has already applied', function (done) {
        mw(
            {
                // req
                body: {
                    applicant: "first",
                    event: "event1"
                }
            }, {
                // res
                locals: {
                    event: {
                        photographersApplied: ["first", "second"],
                        save: (callback) => {
                            callback("already applied error")
                        },
                        id: "1"
                    }
                },
                redirect: target => {
                    expect(target).to.be.eql("/event/details/1")
                    done()
                }
            },
            error => {
                expect(error).to.be.eql("already applied error")
                done()
            })
    })

    it('should call next if the applicant is not set (has type of undefined)', function (done) {
        mw(
            {
                // req
                body: {
                    event: "event1"
                }
            }, {
                // res
                locals: {
                    event: {
                        photographersApplied: ["first", "second"],
                        save: (callback) => {
                            callback("already applied error")
                        },
                        id: "1"
                    }
                },
                redirect: target => {
                    expect(target).to.be.eql("/event/details/1")
                }
            },
            error => {
                expect(error).to.be.eql(undefined)
                done()
            })
    })

    // hasonló az előzőhöz, csak itt az event undefined
    it('should call next if the event is not set (has type of undefined)', function (done) {
        mw(
            {
                // req
                body: {
                    applicant: "an applicant"
                }
            }, {
                // res
                locals: {
                    // event is undefined
                },
                redirect: target => {
                    expect(target).to.be.eql("/event/details/1")
                }
            },
            error => {
                expect(error).to.be.eql(undefined)
                done()
            })
    })
})
