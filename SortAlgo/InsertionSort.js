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
