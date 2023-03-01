const img = new Image(); // Create new img element

img.src = "local.png";

img.onload=main();	//mergem catre functia start

//luam canvasul declarat in html
let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");

let afisezData = document.getElementById("timpRulare");

//declaram butoanele de actiune
let button1 = document.getElementById("mirrorButton");
let button2 = document.getElementById("butonPlus");
let button3 = document.getElementById("butonMinus");

//adaugam eventuri pe butoane
button1.addEventListener("click", oglindire);
button2.addEventListener("click", plus);
button3.addEventListener("click", minus);

//folosim aceasta functie pentru a adauga o pauza de o secunda
function pauza() {

    return new Promise(resolve => {
        setTimeout(() =>
        {resolve('resolved');}, 1000);
    });
}

async function main() {

    await pauza();	//timeout 1s

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);  //afisare imagine originala


    await pauza();
}

function oglindire() {
    var start = Date.now();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    mirror(imageData.data);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the canvas with the new data
    ctx.putImageData(imageData, 0, 0);
    var stop = Date.now();
    var num = stop-start;
    afisezData.innerHTML= "Timpul de rulare este: " + num + " ms";
}

function mirror(data) {
    let i,j;
    var aux;
    var index;
    console.log(data.length);
    console.log(canvas.width);
    console.log(canvas.height);

    for(i = 0; i < canvas.height; i++){
        for(j = 0; j < canvas.width/2; j++){
            index = (i*canvas.width+ j)*4;

            aux = data[index];
            data[index] = data[((canvas.width*(i+1)-1)*4-j*4)];
            data[((canvas.width*(i+1)-1)*4-j*4)] = aux;

            aux = data[index+1];
            data[index+1] = data[((canvas.width*(i+1)-1)*4-j*4)+1];
            data[((canvas.width*(i+1)-1)*4-j*4)+1] = aux;

            aux = data[index+2];
            data[index+2] = data[((canvas.width*(i+1)-1)*4-j*4)+2];
            data[((canvas.width*(i+1)-1)*4-j*4)+2] = aux;

            aux = data[index+3];
            data[index+3] = data[((canvas.width*(i+1)-1)*4-j*4)+3];
            data[((canvas.width*(i+1)-1)*4-j*4)+3] = aux;
        }
    }

}

function plus() {
    var start = Date.now();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    contrastPlus(imageData.data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update the canvas with the new data
    ctx.putImageData(imageData, 0, 0);
    var stop = Date.now();
    var num = stop-start;
    afisezData.innerHTML= "Timpul de rulare este: " + num + " ms";
}

function contrastPlus(data) {
    let i;
    for(i=0;i<data.length;i=i+4){
        if(data[i+3] <= 230){
            data[i+3] += 25;
        }
        else{
            data[i+3] = 255;
        }
    }
}

function minus() {
    var start = Date.now();
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    contrastMinus(imageData.data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update the canvas with the new data
    ctx.putImageData(imageData, 0, 0);
    var stop = Date.now();
    var num = stop-start;
    afisezData.innerHTML= "Timpul de rulare este: " + num + " ms";
}

function contrastMinus(data) {
    let i;
    for(i=0;i<data.length;i=i+4){
        if(data[i+3]>=50){
            data[i+3] -= 25;
        }
    }
}

