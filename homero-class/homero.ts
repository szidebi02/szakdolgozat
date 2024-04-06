class Homero {
    private ho: number
    private hut_fut_auto: string

    constructor() {
        this.hut_fut_auto = "AUTO"
        this.ho = 0
    }

    getAuto(): string {
        return this.hut_fut_auto
    }

    setAuto(ertek: string): void {
        this.hut_fut_auto = ertek
    }

    getHo(): number {
        return this.ho
    }

    setHo(szam: number): void {
        this.ho = szam
    }
}
