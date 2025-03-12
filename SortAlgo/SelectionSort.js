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
