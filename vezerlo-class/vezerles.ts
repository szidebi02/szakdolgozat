class Vezerles {
    private v: Vilagitas
    private ho: FutesHutes
    private radio_jel: number

    constructor(vilagitas: Vilagitas, ho: FutesHutes) {
        this.v = vilagitas
        this.ho = ho
        this.radio_jel = 0
    }

    getRadio() {
        return this.radio_jel
    }

    setRadio(ertek: number) {
        this.radio_jel = ertek
    }

    auto(): void {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Udvozollek", 0, 0)
    }

    Start(): void {
        I2C_LCD1602.LcdInit(39)
        radio.setGroup(1)
        this.auto()

        input.onPinPressed(TouchPin.P0, function () {
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Homerseklet", 0, 0)
            radio.sendString("A")
            this.setRadio(1)
        })

        input.onPinPressed(TouchPin.P1, function () {
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Feny", 0, 0)
            radio.sendString("B")
            this.setRadio(2)
        })

        input.onButtonPressed(Button.A, function () {
            if (this.getRadio() == 1) {
                this.ho.buttonA()
            } else if (this.getRadio() == 2) {
                this.v.be()
            }
        })

        input.onButtonPressed(Button.B, function () {
            if (this.getRadio() == 1) {
                this.ho.buttonB()
            } else if (this.getRadio() == 2) {
                this.v.ki()
            }
        })

        input.onButtonPressed(Button.AB, function () {
            if (this.getRadio() == 1) {
                this.ho.auto()
            } else if (this.getRadio() == 2) {
                this.v.auto()
            }
        })

        radio.onReceivedValue(function (name, value) {
            if (name == "ho") {
                I2C_LCD1602.ShowNumber(value, 0, 1)
                I2C_LCD1602.ShowString("Celsius", 5, 1)
            } else if (name == "feny") {
                if (value < 300) {
                    I2C_LCD1602.ShowString("Sotet van", 0, 1)
                } else {
                    I2C_LCD1602.ShowString("Vilagos van", 0, 1)
                }
            }
        })

        input.onLogoEvent(TouchButtonEvent.Pressed, function () {
            this.auto()
        })
    }
}
