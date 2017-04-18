import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  onResize(event) {
    var meme = document.getElementById('meme1');
    var borderSize = document.getElementById('pageWrapper').offsetWidth;
    if(meme){
      var widthNumber = Number(meme.style.width.substring(0,meme.style.width.length-2));
      if (widthNumber > borderSize*.9){
        var heightNumber = Number(meme.style.height.substring(0,meme.style.height.length-2));
        meme.style.height = heightNumber*borderSize*.9/widthNumber + "px";
        meme.style.width = borderSize*.9 + "px";
      }
    }
  }
}