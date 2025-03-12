let size=50;
let array =[];
let speed=10;
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


async function playbubbleSort() {
    let copy = [...array];
    await bubbleSort(copy);
}


async function playinsertionSort() {
    let copy = [...array];
    await insertionSort(copy);
}



async function bubbleSort(arr) {
    let bars = document.getElementsByClassName("bar");
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = "red"; // Comparing color
            bars[j + 1].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, speed));

            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                bars[j].style.height = arr[j] * 100 + "%";
                bars[j + 1].style.height = arr[j + 1] * 100 + "%";
            }

            bars[j].style.backgroundColor = "blue"; // Reset color
            bars[j + 1].style.backgroundColor = "blue";
        }

        // Mark last sorted element green
        bars[n - i - 1].style.backgroundColor = "green";
    }

    // Ensure all bars are green at the end
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = "green";
    }
}




// Speed Adjustment
document.getElementById("speedSlider").addEventListener("input", (e) => {
  speed = 100 - e.target.value;
});

document.getElementById("sizeSlider").addEventListener("input", (e) => {
    size = parseInt(e.target.value);
    generateArray();
});




async function selectionSort(arr) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "red"; // Highlight the current min element

        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.backgroundColor = "yellow"; // Highlight comparing elements
            await new Promise(resolve => setTimeout(resolve, speed));

            if (arr[j] < arr[minIndex]) {
                if (minIndex !== i) bars[minIndex].style.backgroundColor = "blue"; // Reset old min color
                minIndex = j;
                bars[minIndex].style.backgroundColor = "red"; // New min element
            }

            bars[j].style.backgroundColor = "blue";
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap
        bars[i].style.height = arr[i] * 100 + "%";
        bars[minIndex].style.height = arr[minIndex] * 100 + "%";

        bars[i].style.backgroundColor = "green"; // Mark as sorted
    }

    bars[arr.length - 1].style.backgroundColor = "green"; // Last element sorted
}

async function playselectionSort() {
    let copy = [...array];
    await selectionSort(copy);
}


async function insertionSort(arr) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "red"; // Mark the current key as red

        await new Promise(resolve => setTimeout(resolve, speed));

        while (j >= 0 && arr[j] > key) {
            bars[j].style.backgroundColor = "red"; // Mark comparison bars as red

            await new Promise(resolve => setTimeout(resolve, speed));

            arr[j + 1] = arr[j];
            bars[j + 1].style.height = arr[j] * 100 + "%";

            bars[j].style.backgroundColor = "blue"; // Reset previous bar color
            j--;
        }

        arr[j + 1] = key;
        bars[j + 1].style.height = key * 100 + "%";

        bars[i].style.backgroundColor = "green"; // Mark sorted elements green
    }

    // Ensure all bars turn green at the end
    for (let i = 0; i < arr.length; i++) {
        bars[i].style.backgroundColor = "green";
    }
}




async function merge(arr, low, mid, high) {
    let temp = [];
    let left = low, right = mid + 1;
    let bars = document.getElementsByClassName("bar"); // Get all bars from the DOM

    while (left <= mid && right <= high) {
        // Highlight the compared bars
        bars[left].style.backgroundColor = "red";
        bars[right].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, speed));

        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }

        // Reset colors after comparison
        if (left - 1 >= low) bars[left - 1].style.backgroundColor = "blue";
        if (right - 1 <= high) bars[right - 1].style.backgroundColor = "blue";
    }

    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }

    while (right <= high) {
        temp.push(arr[right]);
        right++;
    }

    // Copy sorted values back into the original array with animation
    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low];

        // Update the visualizer
        bars[i].style.height = arr[i] * 100 + "%";
        bars[i].style.backgroundColor = "green"; // Show merged part in green
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function mS(arr, low, high) {
    if (low >= high) return;
    
    let mid = Math.floor((low + high) / 2);
    await mS(arr, low, mid);
    await mS(arr, mid + 1, high);
    await merge(arr, low, mid, high);
}

async function playMergeSort() {
    let copy = [...array];
    await mS(copy, 0, copy.length - 1);
}

async function quickSort(arr, left, right) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }

    // Ensure all bars are marked green when sorted
    let bars = document.getElementsByClassName("bar");
    for (let i = left; i <= right; i++) {
        bars[i].style.backgroundColor = "green";
    }
}

async function partition(arr, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        bars[j].style.backgroundColor = "red"; // Comparing color
        await new Promise(resolve => setTimeout(resolve, speed));

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = arr[i] * 100 + "%";
            bars[j].style.height = arr[j] * 100 + "%";
        }

        bars[j].style.backgroundColor = "blue"; // Reset color
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    bars[i + 1].style.height = arr[i + 1] * 100 + "%";
    bars[right].style.height = arr[right] * 100 + "%";

    return i + 1;
}

async function playQuickSort() {
    let copy = [...array];
    await quickSort(copy, 0, copy.length - 1);
}

