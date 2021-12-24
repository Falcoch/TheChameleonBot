export class CommandeUtils {
    
    public static getArgument(commande  : string) : string[] {
        let tmp_str = commande.split(' ');
        delete tmp_str[0];
        return tmp_str
    }
}