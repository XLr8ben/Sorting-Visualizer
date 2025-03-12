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