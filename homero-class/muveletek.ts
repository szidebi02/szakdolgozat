class Muveletek {
    private h: Homero

    constructor(homero: Homero) {
        this.h = homero
    }

    fut(): void {
        basic.pause(100)
        pins.analogWritePin(AnalogPin.P1, 100)
        pins.analogWritePin(AnalogPin.P2, 1023)
        pins.analogWritePin(AnalogPin.P8, 900)
    }

    nem_fut_hut(): void {
        basic.pause(100)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 1023)
        pins.analogWritePin(AnalogPin.P8, 1023)
    }

    hut(): void {
        basic.pause(100)
        pins.analogWritePin(AnalogPin.P1, 1023)
        pins.analogWritePin(AnalogPin.P2, 100)
        pins.analogWritePin(AnalogPin.P8, 900)
    }

    auto(): void {
        this.h.setHo(dstemp.celsius(DigitalPin.P0))
        if (this.h.getHo() > 27) {
            pins.analogWritePin(AnalogPin.P1, 1023)
            pins.analogWritePin(AnalogPin.P2, 0)
            pins.analogWritePin(AnalogPin.P8, 1023)
        } else if (this.h.getHo() < 21) {
            pins.analogWritePin(AnalogPin.P1, 0)
            pins.analogWritePin(AnalogPin.P2, 1023)
            pins.analogWritePin(AnalogPin.P8, 1023)
        } else {
            pins.analogWritePin(AnalogPin.P1, 1023)
            pins.analogWritePin(AnalogPin.P2, 1023)
            pins.analogWritePin(AnalogPin.P8, 0)
        }
        basic.showNumber(this.h.getHo())
    }

    Start(): void {
        radio.setGroup(1)

        radio.onReceivedString(function (receivedString) {
            if (receivedString == "A") {
                radio.sendValue("ho", this.h.getHo())
            } else if (receivedString == "FUT") {
                this.h.setAuto("MANUAL")
                this.fut()
            } else if (receivedString == "NEM_FUT_HUT") {
                this.h.setAuto("MANUAL")
                this.nem_fut_hut()
            } else if (receivedString == "HUT") {
                this.h.setAuto("MANUAL")
                this.hut()
            } else if (receivedString == "HO_AUTO") {
                this.h.setAuto("AUTO")
            }
        })

        basic.forever(function () {
            if (this.h.getAuto() == "AUTO") {
                this.auto()
            }
        })
    }
}
