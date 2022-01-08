export class CommandeUtils {
    
    public static getArgument(commande  : string) : string[] {
        let tmp_str = commande.split(' ');
        return tmp_str
    }
}