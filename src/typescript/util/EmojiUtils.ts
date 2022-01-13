export enum ChameleonEmoji {
    PAINT = "<:Falcoch:930490302878339113> ",
    CRAZY = "<:Crazy:930490524165615626>",
    EGGMAN = "<:Eggman:470919075216883713>",
    SONIC_WHAT = "<:Sonic:470905969195614210>",
    HOLY = "<:Holy:930490404871217203>",
    SCARE = "<:Scrary:930490374806437898>",
    LEFT_ARROW = "<:LeftArrow:930493584879284335>",
    RIGHT_ARROW = "<:RightArrow:930493528532996156>",
    NICE = "<:Nice:930490246477516871>"
}

export enum ChameleonChannelEmoji {
    PAUSE = "<:PauseStart:930873209652387881>",
    STOP = "<:Stop:930873102433398895>",
    SKIP = "<:Skip:930873072490274866>",
    LOOP = "<:Loop:930872966185639966>",
    SHUFFLE = "<:Shuffle:930873138013700207>",
}

export class EmojiUtils {

    public static getEmojiID(emoji : string) {
        return emoji.split(':')[2].split('>')[0]
    }
}