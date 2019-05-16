import { Component, OnInit, HostListener } from '@angular/core';
import { WebsocketService } from "../websocket.service";
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {

	constructor(
		private websocket: WebsocketService, 
	//	private curOctave: number, 
	//	private keybindings: object,
	) { }
	
	private curOctave;
	private keybindings;
	private keydown: boolean[];

	ngOnInit() {
		this.curOctave = 3;
		this.keydown = [];
		this.keybindings = {
			//z x c v b n m , . /
			90: 25,
			88: 27,
			67: 28,
			86: 30,
			66: 32,
			78: 33,
			77: 35,
			188: 37,
			190: 39,
			191: 40,
			
			//a s f g j k l '
			65: 24,
			83: 26,
			70: 29,
			71: 31,
			74: 34,
			75: 36,
			76: 38,
			222: 41,
			
			//q w e r t y u i o p
			81: 42,
			87: 44,
			69: 45,
			82: 47,
			84: 49,
			89: 51,
			85: 52,
			73: 54,
			79: 56,
			80: 57,	  
		}
		
		for (let a = 0; a < 223; a++){
			this.keydown[a] = false;
		}
		
		setTimeout(function() { document.getElementById("piano").classList.toggle("preload"); }, 1000);
		
	}

	@HostListener('window:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		if (!this.keydown[event.keyCode] && !this.websocket.inChat){
			//left arrow key
			if (event.keyCode === 37){
				this.lowerOctave();
				
			//right arrow key
			}else if (event.keyCode === 39){
				this.raiseOctave();
				
			}else if (this.keybindings[event.keyCode] > 0 && this.keybindings[event.keyCode] <= 88){
				let curElement = document.getElementById(this.keybindings[event.keyCode]);

				curElement.click();

				let child = <Element>curElement.firstChild;
				child.classList.toggle("hide");
			}
			
			this.keydown[event.keyCode] = !this.keydown[event.keyCode];
		}
	}
	
	/*
	@HostListener('window:keypress', ['$event'])
	onKeypress(event: KeyboardEvent) {
		if (this.keybindings[event.keyCode] > 0 && this.keybindings[event.keyCode] <= 88){
			let curElement = document.getElementById(this.keybindings[event.keyCode]).childNodes[0];
			curElement.classList.toggle("hide");
		}
	}
	*/
	
	@HostListener('window:keyup', ['$event'])
	onKeyup(event: KeyboardEvent) {
		if (!this.websocket.inChat){
			if (this.keybindings[event.keyCode] > 0 && this.keybindings[event.keyCode] <= 88){
				let curElement = <Element>document.getElementById(this.keybindings[event.keyCode]).childNodes[0];
				curElement.classList.toggle("hide");
			}
			
			this.keydown[event.keyCode] = !this.keydown[event.keyCode];
		}
	}
	
	lowerOctave(): void{
		if (this.curOctave == 1) return;
		this.curOctave--;
		for (let binding in this.keybindings){
			this.keybindings[binding] -= 12;
		}
	}
	
	raiseOctave(): void{
		if (this.curOctave == 7) return;
		this.curOctave++;
		
		for (let binding in this.keybindings){
			this.keybindings[binding] += 12;
		}
	}
	

	keyPress(pianoKey : number){
		//emit the pressed key
		this.websocket.sendNote(pianoKey);
		this.websocket.toggleChat(false);
	}

	pianoKeys = [
				{ whiteKeyId: 1, blackKeyId: 0 },
				{ whiteKeyId: 3, blackKeyId: 2 },
				{ whiteKeyId: 4, blackKeyId: 0 },
				{ whiteKeyId: 6, blackKeyId: 5 },
				{ whiteKeyId: 8, blackKeyId: 7 },
				{ whiteKeyId: 9, blackKeyId: 0 },
				{ whiteKeyId: 11, blackKeyId: 10 },
				{ whiteKeyId: 13, blackKeyId: 12 },
				{ whiteKeyId: 15, blackKeyId: 14 },
				{ whiteKeyId: 16, blackKeyId: 0 },
				{ whiteKeyId: 18, blackKeyId: 17 },
				{ whiteKeyId: 20, blackKeyId: 19 },
				{ whiteKeyId: 21, blackKeyId: 0 },
				{ whiteKeyId: 23, blackKeyId: 22 },
				{ whiteKeyId: 25, blackKeyId: 24 },
				{ whiteKeyId: 27, blackKeyId: 26 },
				{ whiteKeyId: 28, blackKeyId: 0 },
				{ whiteKeyId: 30, blackKeyId: 29 },
				{ whiteKeyId: 32, blackKeyId: 31 },
				{ whiteKeyId: 33, blackKeyId: 0 },
				{ whiteKeyId: 35, blackKeyId: 34 },
				{ whiteKeyId: 37, blackKeyId: 36 },
				{ whiteKeyId: 39, blackKeyId: 38 },
				{ whiteKeyId: 40, blackKeyId: 0 },
				{ whiteKeyId: 42, blackKeyId: 41 },
				{ whiteKeyId: 44, blackKeyId: 43 },
				{ whiteKeyId: 45, blackKeyId: 0 },
				{ whiteKeyId: 47, blackKeyId: 46 },
				{ whiteKeyId: 49, blackKeyId: 48 },
				{ whiteKeyId: 51, blackKeyId: 50 },
				{ whiteKeyId: 52, blackKeyId: 0 },
				{ whiteKeyId: 54, blackKeyId: 53 },
				{ whiteKeyId: 56, blackKeyId: 55 },
				{ whiteKeyId: 57, blackKeyId: 0 },
				{ whiteKeyId: 59, blackKeyId: 58 },
				{ whiteKeyId: 61, blackKeyId: 60 },
				{ whiteKeyId: 63, blackKeyId: 62 },
				{ whiteKeyId: 64, blackKeyId: 0 },
				{ whiteKeyId: 66, blackKeyId: 65 },
				{ whiteKeyId: 68, blackKeyId: 67 },
				{ whiteKeyId: 69, blackKeyId: 0 },
				{ whiteKeyId: 71, blackKeyId: 70 },
				{ whiteKeyId: 73, blackKeyId: 72 },
				{ whiteKeyId: 75, blackKeyId: 74 },
				{ whiteKeyId: 76, blackKeyId: 0 },
				{ whiteKeyId: 78, blackKeyId: 77 },
				{ whiteKeyId: 80, blackKeyId: 79 },
				{ whiteKeyId: 81, blackKeyId: 0 },
				{ whiteKeyId: 83, blackKeyId: 82 },
				{ whiteKeyId: 85, blackKeyId: 84 },
				{ whiteKeyId: 87, blackKeyId: 86 },
				{ whiteKeyId: 88, blackKeyId: 0 },
			];
}
