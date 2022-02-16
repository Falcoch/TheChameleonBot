import fs from "fs"

export class FileOutputUtil {

    public static get(file : string) : any {
        let data = JSON.parse(fs.readFileSync(file,'utf-8'));
        let guild = {
            Name : data['Name'],
            Id : data['Id'],
            ChannelId : data['channelId']   
        };
        return guild;
    }

    public static getAll(dataDirectory : string) : any[] {
        let result = new Array();
        let files : string[] = fs.readdirSync(dataDirectory);
        files.forEach(name => {
            let data = JSON.parse(fs.readFileSync(dataDirectory + "/" + name,'utf-8'));
            let guild = {
                Name : data['Name'],
                Id : data['Id'],
                ChannelId : data['ChannelId']   
            };
            result.push(guild);
        });
        return result;
    }
 
    public static save(dataDirectory : string,serverName : string, serverID : string,clientChannelId : string) : boolean {
        let guild = {
            Name : serverName,
            Id : serverID,
            ChannelId : clientChannelId
        };
        fs.writeFileSync(dataDirectory + "/" + serverID + ".json", JSON.stringify(guild, null, 2), { flag: 'w+' });
        return true
    }

    public static erase(dataDirectory : string,serverID) : boolean {
        fs.unlinkSync(dataDirectory + "/" + serverID + ".json");
        return true
    }

    
}