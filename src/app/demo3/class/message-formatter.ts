export class MessageFormatter< T > {
    formatSocketMessage(inputMessage: T): string {
        let returnString = '{"cmd":"none"}';

        // for (let i = 0; i < inputMessage.length; i++) {

        // }
        returnString = JSON.stringify(inputMessage);
        return returnString;
    }
}
