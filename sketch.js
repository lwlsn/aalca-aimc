let counter = 1;

let flashCount; 
let lastFlashTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  flashColor = color(255); // Initial color is white
}

function draw() {
  background(0);

   // Calculate time elapsed since the last flash
   let currentTime = millis() / 1000; // Convert milliseconds to seconds
  //  let timeSinceLastFlash = currentTime - lastFlashTime;


   if (currentTime < 10) {
    flashCount =0;
   } 
   else if (currentTime >= 10 && currentTime < 20) {
    flashCount = 1;
   }
   else if (currentTime >= 30 && currentTime < 40) {
    flashCount = 2;
   }
   else  {
    flashCount = 3;
   }

  for (let i=0; i<1 ; i++) {
    push();
      translate(width/2 - (i)*(height-60),height/2);
      block(i);
    pop();
  }


  push();
		stroke(255);
		strokeWeight(2);
		line(0,10,width,10);
		line(0,height-10,width,height-10);
	pop();


}

function block(noiseSeed) {
  noiseSeed = noiseSeed || 1; 

  if (frameCount > 100) {
    counter = lerp(counter,height/4,0.1);
  }

  let selected = int(noise(frameCount/400,noiseSeed)*100);

  for (let i=0; i < 100; i++) {
    push();
      let ang = noise(frameCount/500,i,noiseSeed*100)* 3 * PI + noiseSeed*10;
      let r = counter;
      let p = createVector(1,1).mult(r).rotate(ang);

      fill(255);
      if ( i == selected) {
        fill('red');
      }

      // To-do, select data from p? 

      stroke(255, 70);
      line(0, 0, p.x, p.y);
      noStroke();
      rect(p.x, p.y, 5, 5);

      if ( i == selected) {
        push();
          translate(p.x, p.y);
          rect(20,0,40,3);
          rect(20,10,15,3);
          rect(20,20,65,3);
          text("POZ: "+ int(p.x)+ ", " + int(p.y) + "<"+ang,20,50);
        pop();

      }

    pop();
  }

  stroke(255);
  noFill();
  ellipse(0, 0, 50, 50);
  textSize(10);
  text("TARGET #ID: "+selected,20,20);


  // Produce sporadic flashes 
  if (frameCount % 1000 < 30) {
    let fillColour; 
    switch (flashCount){
      case 1:
        fillColour = color(255, 0, 0);
        break;
      case 2:
        fillColour = color(0,255, 0);
        break;
      case 3:
        fillColour = color(0, 0, 255);
        break;
      default:
        fillColour = (255);
      
    }
  
  

    if (frameCount % 4<2){
			background(fillColour);
      // fill(0);
      // textSize(32)
		}else{
			// do nothing? 
		}
  }






  // fill with rects + text
  let edge = height - 100;
  stroke(255);
  rect(-edge/2,-edge/2,edge,edge);
  stroke(255, 150);
  line(-edge/2, 0, edge/2, 0 );
  line(0, -edge/2, 0, edge/2);

  edge = height - 80;
  stroke(255, 30);

  noStroke();
  fill(255);
  textSize(12);
  text("EXPR#"+noiseSeed,-edge/2,-edge/2+ 10);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}