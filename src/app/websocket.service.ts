import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject";
import * as Rx from "rxjs";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
	constructor() {
	    this.connect();
	}

	private socket;
	private username = "Anonymous";
	messageList = [];
	
	public inChat = false;

	public connect(){
		this.socket = webSocket('ws://websocket-server-1337.herokuapp.com');
		this.socket.subscribe(
			msg => this.handleMsg(msg), // Called whenever there is a message from the server.
			err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log('complete') // Called when connection is closed (for whatever reason).
		);
	}
	
	public disconnect(){
		this.socket.unsubscribe();
	}

	public sendMessage(msg: string): void{
		let message = {message: msg, username: this.username};
		this.socket.next(message);
	}
	
	public sendNote(note: number): void{
		
		let message = {audio: note, username: this.username};
		this.socket.next(message);
	}
	
	public handleMsg(msg){
		let message = JSON.parse(msg);
		let command = Object.keys(message)[0];
		switch(command){
			case 'message':
				if (this.messageList.length > 100) this.messageList.shift();			
				this.messageList.push(message);
				
				break;
			case 'audio':
				//https://stackoverflow.com/questions/37911333/how-to-get-to-the-public-directory
				let note = new Audio("./assets/sounds/" + message[command] + ".mp3");
				let promise = note.play();
				if (promise !== null){
					promise.catch(() => { note.play(); })
				}
				break;
			default:
				break;

		}
	}
	
	public toggleChat(toggle: boolean): void{
		this.inChat = toggle;
	}
	
	public changeUsername(username: string): void{
		this.username = username;
	}

}