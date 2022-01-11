export enum ChameleonEmoji {
    PAINT = "<:Falcoch:930490302878339113> ",
    CRAZY = "<:Crazy:930490524165615626>",
    EGGMAN = "<:Eggman:470919075216883713>",
    SONIC_WHAT = "<:Sonic:470905969195614210>",
    HOLY = "<:Holy:930490404871217203>",
    SCARE = "<:Scrary:930490374806437898>",
    LEFT_ARROW = "<:LeftArrow:930493584879284335>",
    RIGHT_ARROW = "<:RightArrow:930493528532996156>"
}

export class EmojiUtils {

    public static getEmojiID(emoji : string) {
        return emoji.split(':')[2].split('>')[0]
    }
}