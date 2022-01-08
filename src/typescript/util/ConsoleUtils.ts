export class ConsoleUtils {

    public static log(data : any) {
        let date : Date = new Date();
        console.log("| [" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] - " + data);
    }

    public static logData(data : any, title : string) {
        let date : Date = new Date();
        console.log("| [" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] - " + title + " -" + data);
    }

    public static logSuccess(data : any) {
        let date : Date = new Date();
        console.log("| [" + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds() + "] - \x1b[32mSuccess\x1b[0m - " + data);
    }

    public static logWarning(data : any) {
        let date : Date = new Date();
        console.log("| [" + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds() + "] - \x1b[33mWarning\x1b[0m - " + data)
    }

    public static logError(data : any) {
        let date : Date = new Date();
        console.log("| [" + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds() + "] - \x1b[31mError\x1b[0m - " + data);
    }
}