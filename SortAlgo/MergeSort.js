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