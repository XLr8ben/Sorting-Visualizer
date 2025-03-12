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
