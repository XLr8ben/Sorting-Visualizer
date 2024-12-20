let size=50;
let array =[];
let speed=50;
let audioCtx=null;

generateArray();

console.log(array);

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node =audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function generateArray(){
    array = []; 
    for(let i=0;i<size;i++){
        array[i]=Math.random();
    }
    showBars();
}

function showBars(indices){
    visualizer.innerHTML='';
    for(let i=0;i<size;i++){
        let bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");   
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red"; 
        }
        visualizer.appendChild(bar);
    }
}

// function showBars(sortedIndices = { sorted: [], comparing: [] }) {
//     visualizer.innerHTML = '';
//     for (let i = 0; i < size; i++) {
//         let bar = document.createElement("div");
//         bar.style.height = array[i] * 100 + "%";
//         bar.classList.add("bar");

//         // Highlight the sorted part (green) and the currently comparing parts (red)
//         if (sortedIndices.sorted.includes(i)) {
//             bar.style.backgroundColor = "green";  // Sorted part is green
//         } else if (sortedIndices.comparing.includes(i)) {
//             bar.style.backgroundColor = "red";  // Comparing part is red
//         } else {
//             bar.style.backgroundColor = "blue";  // Default color for unsorted parts
//         }

//         visualizer.appendChild(bar);
//     }
    
// }


function animate(swaps) {
    if (swaps.length === 0) {
        showBars();
        return;  // End of animation, everything is sorted
    }
    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i,j]);  // Highlight the swapped elements
    setTimeout(() => {
        animate(swaps);
    }, speed);
}

function playbubbleSort(){
    const copy=[...array];
    bubbleSort(copy);

}

function playselectionSort(){
    const copy=[...array];
    selectionSort(copy);
}

function bubbleSort(array) {
    const swaps = [];
    for (let i = array.length - 1; i >= 0; i--) {
        let isSwap = false;
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                isSwap = true;
                swaps.push([j, j + 1]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        if (!isSwap) {
            break;
        }
    }   
    animate(swaps);
}

// Speed Adjustment
document.getElementById("speedSlider").addEventListener("input", (e) => {
  speed = 100 - e.target.value;
});

document.getElementById("sizeSlider").addEventListener("input", (e) => {
    size = parseInt(e.target.value);
    generateArray();
});




function selectionSort(array){
     //code here
     const swaps=[];
 for(let i=0;i<=array.length-2;i++){
    let min=i;
    for(let j=i+1;j<=array.length-1;j++){
        if(array[j]<array[min]){
            swaps.push([j,min]);
            [array[j],array[min]] = [array[min],array[j]];
        }
    }
}
animate(swaps);
}






//  // Your code here
//  for(let i=n-1;i>=0;i--){
//     let isSwap=false;
//     for(let j=0;j<=i-1;j++){
//         if(arr[j]>arr[j+1]){
//             swap(arr[j],arr[j+1]);
//             isSwap=true;
//         }
//     }
//     if(isSwap=false){
//         break;
//     }
// }


































// const visualizer = document.getElementById("visualizer");
// let array = [];
// let speed = 50;

// // Generate a random array
// function generateArray(size = 50) {
//   array = Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 10);
//   renderArray();
// }

// // Render the array as bars
// function renderArray() {
//   visualizer.innerHTML = '';
//   array.forEach(value => {
//     const bar = document.createElement("div");
//     bar.style.height = `${value}px`;
//     bar.style.width = `${100 / array.length - 0.5}%`;
//     bar.classList.add("bar");
//     visualizer.appendChild(bar);
//   });
// }

// // Bubble Sort Algorithm
// async function bubbleSort() {
//   const bars = document.getElementsByClassName("bar");
//   for (let i = 0; i < array.length; i++) {
//     for (let j = 0; j < array.length - i - 1; j++) {
//       bars[j].style.backgroundColor = "red";
//       bars[j + 1].style.backgroundColor = "red";

//       if (array[j] > array[j + 1]) {
//         [array[j], array[j + 1]] = [array[j + 1], array[j]];
//         renderArray();
//         await wait(speed);
//       }

//       bars[j].style.backgroundColor = "#007bff";
//       bars[j + 1].style.backgroundColor = "#007bff";
//     }
//   }
// }

// // Selection Sort Algorithm
// async function selectionSort() {
//   const bars = document.getElementsByClassName("bar");
//   for (let i = 0; i < array.length; i++) {
//     let minIndex = i;
//     bars[minIndex].style.backgroundColor = "green";
//     for (let j = i + 1; j < array.length; j++) {
//       bars[j].style.backgroundColor = "red";
//       if (array[j] < array[minIndex]) {
//         bars[minIndex].style.backgroundColor = "#007bff";
//         minIndex = j;
//         bars[minIndex].style.backgroundColor = "green";
//       }
//       await wait(speed);
//       bars[j].style.backgroundColor = "#007bff";
//     }
//     [array[i], array[minIndex]] = [array[minIndex], array[i]];
//     renderArray();
//     await wait(speed);
//     bars[minIndex].style.backgroundColor = "#007bff";
//   }
// }

// // Speed Adjustment
// document.getElementById("speedSlider").addEventListener("input", (e) => {
//   speed = 100 - e.target.value;
// });

// // Wait function for animation
// function wait(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Initial array generation
// generateArray();
