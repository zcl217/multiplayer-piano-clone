import { Component, OnInit, HostListener } from '@angular/core';
import { WebsocketService } from "../websocket.service";
import { Observable } from "rxjs/Observable"

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
	
	constructor(
		public websocket: WebsocketService,
	) {}
	
	public message = '';
	private observer;
	private showPrompt = false;

	ngOnInit() {		
		//https://stackoverflow.com/questions/36130393/angular2-directive-how-to-detect-dom-changes
		this.observer = new MutationObserver(mutations => {
			let box = document.getElementById("chatbox");
			box.scrollTop = box.scrollHeight - box.clientHeight;		  
		});
		let config = { attributes: true, childList: true, characterData: true };

		this.observer.observe(document.getElementById("chatbox"), config);
	}
	
	ngOnChanges(){
		
	}
  
  
	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		//escape
		if (event.keyCode === 27){
			this.websocket.toggleChat(false);
			//blur makes the input lose focus
			document.getElementById("input").blur();
		//enter
		}else if (event.keyCode === 13 && this.websocket.inChat){
			this.sendMsg();
		}
	}
	
	/*
	@HostListener('window:click')
	clickInside() {
		this.websocket.toggleChat(false);
	}
	*/
	
	@HostListener('click')
	clickInside() {
		this.websocket.toggleChat(true);
	}

	@HostListener('window:unload', [ '$event' ])
	unloadHandler(event) {
		//this.websocket.disconnect();
		//this.observer.unsubscribe();
	}

	sendMsg(){
		if (this.message !== ''){
			this.websocket.sendMessage(this.message);
			this.message = '';
		}
	}
	
	changeUsername(username: string){
		if (username !== ''){
			this.websocket.changeUsername(username);
		}
		this.showPrompt = false;
	}
	
	userChangePrompt(){
		this.showPrompt = true;
	}
  
}
