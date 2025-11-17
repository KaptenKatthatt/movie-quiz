import { Player } from "./player";

export class HighScoreList{
static players: Player[] = [];

 addPlayer(player: Player): void{
    HighScoreList.players.push(player)
 }   
 removeLowestScore(): void{
    
 }
 static sort():void{
    HighScoreList.players.sort((a, b) => b.score - a.score)
 }
 getHighestScore(){

 }
 static getHighestPlayerId(): number{
    if (HighScoreList.players.length === 0) return -1;
    HighScoreList.sort();
    return HighScoreList.players[0]?.id ?? -1;
 }
}