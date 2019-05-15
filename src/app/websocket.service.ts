import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject";
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
	constructor() {
		console.log("here it is");
	    this.connect();
	}

	private socket;
	private username = "Anonymous";
	messageList = [];
	
	public inChat = false;

	public connect(){
		this.socket = webSocket('ws://localhost:3000/');
		this.socket.subscribe(
			msg => this.handleMsg(msg), // Called whenever there is a message from the server.
			err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
			() => console.log('complete') // Called when connection is closed (for whatever reason).
		);
		console.log("connected");
	}
	
	public disconnect(){
		this.socket.unsubscribe();
	}

	public sendMessage(msg: string): void{
		console.log("in wss, sending message");
		let message = {message: msg, username: this.username};
		this.socket.next(message);
	}
	
	public sendNote(note: number): void{
		
		let message = {audio: note, username: this.username};
		this.socket.next(message);
	}
	
	public handleMsg(msg){
		console.log("received message from server");
		console.log(msg);
		let message = JSON.parse(msg);
		let command = Object.keys(message)[0];
		console.log(command);
		switch(command){
			case 'message':
				console.log(this.messageList);
				if (this.messageList.length > 100) this.messageList.shift();			
				this.messageList.push(message);
				
				break;
			case 'audio':
				let note = new Audio("./piano/sounds/" + message[command] + ".wav");
				note.play();
				break;
			default:
				break;

		}
	}
	
	public toggleChat(toggle: boolean): void{
		this.inChat = toggle;
	}

}