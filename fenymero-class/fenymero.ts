class Fenymero {
    private feny: number
    private le_fel_auto: string

    constructor() {
        this.le_fel_auto = "AUTO"
        this.feny = 0
    }

    getAuto(): string {
        return this.le_fel_auto
    }

    setAuto(ertek: string): void {
        this.le_fel_auto = ertek
    }

    getFeny(): number {
        return this.feny
    }

    setFeny(szam: number): void {
        this.feny = szam
    }
}
