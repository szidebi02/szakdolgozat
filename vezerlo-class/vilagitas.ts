class Vilagitas implements Muveletek{

    be(): void {
        radio.sendString("FEL")
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Lampa fel", 0, 0)
    }

    ki(): void {
        radio.sendString("LE")
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Lampa le", 0, 0)
    }

    auto(): void {
        radio.sendString("FENY_AUTO")
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Lampa auto", 0, 0)
    }
}
