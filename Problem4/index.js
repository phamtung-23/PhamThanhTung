// Implementation A: Iterative Loop
function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Implementation B: Mathematical Formula
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}
// Implementation C: Recursive Approach
function sum_to_n_c(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}
console.log("Option 1: sum = ", sum_to_n_a(10));
console.log("Option 2: sum = ", sum_to_n_b(10));
console.log("Option 3: sum = ", sum_to_n_c(10));
