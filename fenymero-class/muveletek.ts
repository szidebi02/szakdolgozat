class Muveletek {
    private f: Fenymero

    constructor(fenymero: Fenymero) {
        this.f = fenymero
    }

    fel(): void {
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P1, 1)
    }

    le(): void {
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    auto(): void {
        this.f.setFeny(pins.analogReadPin(AnalogPin.P0))
        pins.digitalWritePin(DigitalPin.P1, 0)
        if (this.f.getFeny() < 300) {
            pins.digitalWritePin(DigitalPin.P1, 1)
        }
        basic.showNumber(this.f.getFeny())
    }

    Start(): void {
        radio.setGroup(1)

        radio.onReceivedString(function (receivedString) {
            if (receivedString == "B") {
                radio.sendValue("feny", this.f.getFeny())
            } else if (receivedString == "FEL") {
                this.f.setAuto("FEL")
                this.fel()
            } else if (receivedString == "LE") {
                this.f.setAuto("LE")
                this.le()
            } else if (receivedString == "FENY_AUTO") {
                this.f.setAuto("AUTO")
            }
        })

        basic.forever(function () {
            if (this.f.getAuto() == "AUTO") {
                this.auto()
            }
        })
    }
}
