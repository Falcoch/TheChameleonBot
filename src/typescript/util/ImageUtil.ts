export enum PaintImage { 
    BASIC = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaint.png?raw=true',
    REFLECT = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaint2.png?raw=true',
    SCARY = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintAWithArms.png?raw=true',
    CRAZY = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintCrazypng.png?raw=true',
    DEAD = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintDead.png?raw=true',
    HAPPY = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintHappy.png?raw=true',
    HOLY = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintHoly.png?raw=true',
    NICE = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintNice.png?raw=true',
    PAPER = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintPaper.png?raw=true',
    SHIT = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintShit.png?raw=true',
    TRYST = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintTryst.png?raw=true',
    VERY_HAPPY = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintVeryHappy.png?raw=true',
    WOW = 'https://github.com/Falcoch/TheChameleonBot/blob/master/image/FalcochPaintWow.png?raw=true',
    MUSIC = 'https://raw.githubusercontent.com/Falcoch/TheChameleonBot/master/gitimage/FalcochPaintMusic.png',
    CHANNEL = "https://raw.githubusercontent.com/Falcoch/TheChameleonBot/master/image/FalcochPaintCrazyChannel.png",
}

export class ImageUtil {
    public static getRandom() : string {
        let data : PaintImage[] = [
            PaintImage.BASIC,PaintImage.REFLECT,PaintImage.SCARY,PaintImage.CRAZY,PaintImage.DEAD,
            PaintImage.HAPPY,PaintImage.HOLY,PaintImage.NICE,PaintImage.PAPER,PaintImage.PAPER,
            PaintImage.SHIT,PaintImage.VERY_HAPPY,PaintImage.WOW
        ];
        return data[Math.floor(Math.random() * data.length)];
    }

    public static getHelp() : string {
        let data : PaintImage[] = [
            PaintImage.PAPER,PaintImage.BASIC,PaintImage.NICE
        ]
        return data[Math.floor(Math.random() * data.length)];
    }

    public static getError() : string {
        let data : PaintImage[] = [
            PaintImage.SHIT,PaintImage.REFLECT,PaintImage.DEAD,PaintImage.TRYST
        ]
        return data[Math.floor(Math.random() * data.length)];
    }

    public static getMusic() : string {
        return PaintImage.MUSIC;
    }

    public static getChannel() : string {
        return PaintImage.CHANNEL;
    }
}

