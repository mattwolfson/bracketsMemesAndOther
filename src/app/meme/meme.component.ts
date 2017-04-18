import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent {
  title = 'Meme Machine';
  meme: Meme = {
	  id: 1,
	  name: 'First Meme',
    imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
	  topText: 'One Does Not Simply',
	  bottomText: 'Eat One Tortilla Chip'
	};
  onImageUpdate(newUrl) {
    var img = new Image();
    img.onload = function(){
      var width = img.width
      var height = img.height;
      var maxWidth = document.getElementById('pageWrapper').offsetWidth*.9;
      var maxHeight = 600;
      if(width > maxWidth) {
        height = height*maxWidth/width;
        width = maxWidth;
      }
      document.getElementById("meme1").style.height = String(height)+"px";
      document.getElementById("meme1").style.width = String(width)+"px";
    };
    img.src = newUrl;
    document.getElementById("meme1").style.backgroundImage = "url("+newUrl+")";
  };

  onResize(event) {
    console.log(event);
   }
  ngAfterViewInit() {
      this.onImageUpdate(this.meme.imageUrl);
  };
}
export class Meme {
  id: number;
  name: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
}
