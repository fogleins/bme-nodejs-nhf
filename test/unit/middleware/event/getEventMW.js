const expect = require('chai').expect;
const getEventMW = require('../../../../middleware/event/getEventMW');

describe('getEventMW middleware ', function () {

    it('should return an event from the db', function (done) {
        const mw = getEventMW({
            EventModel: {
                findOne: (condition, callback) => {
                    expect(condition).to.be.eql({_id: "1"})
                    callback(null, "mockEvent")
                }
            }
        })

        const resMock = {
            locals: {}
        }

        mw({
            params: {
                eventid: "1"
            }
        }, resMock, (error) => {
            expect(error).to.be.eql(undefined)
            expect(resMock.locals).to.be.eql({event: "mockEvent"})
            done()
        })

    })

    it('should call next() on db error', function (done) {
        const mw = getEventMW({
            EventModel: {
                findOne: (condition, callback) => {
                    expect(condition).to.be.eql({_id: "1"})
                    callback("some error", null)
                }
            }
        })

        const resMock = {
            locals: {}
        }

        mw({
            params: {
                eventid: "1"
            }
        }, resMock, (error) => {
            expect(error).to.be.eql("some error")
            done()
        })
    })

    it('should call next() when no event is returned from the db', function (done) {
        const mw = getEventMW({
            EventModel: {
                findOne: (condition, callback) => {
                    expect(condition).to.be.eql({_id: "1"})
                    callback(undefined, null)
                }
            }
        })

        const resMock = {
            locals: {}
        }

        mw({
            params: {
                eventid: "1"
            }
        }, resMock, (error) => {
            expect(error).to.be.eql(undefined)
            expect(resMock.locals).to.be.eql({})
            done()
        })

    })
})
