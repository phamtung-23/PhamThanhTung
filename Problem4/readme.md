# Sum to N Functions in TypeScript

This repository contains three implementations of a function that calculates the sum of all integers from 1 to a given number \( n \). Each implementation has unique characteristics in terms of time and space efficiency.

## Functions Overview

### 1. Iterative Loop: `sum_to_n_a`
- **Function Definition:**
  ```ts
  function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
  ```
- **Description:** This function uses a simple loop to add numbers from 1 to \( n \).

### 2. Mathematical Formula: `sum_to_n_b`
- **Function Definition:**
  ```ts
  function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
  }
  ```
- **Description:** This function calculates the sum using the formula \((n \times (n + 1)) / 2\).

### 3. Recursive Approach: `sum_to_n_c`
- **Function Definition:**
  ```ts
  function sum_to_n_c(n: number): number {
    if (n <= 1) {
      return n;
    }
    return n + sum_to_n_c(n - 1);
  }
  ```
- **Description:** This function recursively adds numbers from \( n \) down to 1.

## Summary of Results

- **Most Efficient (Time & Space):** `sum_to_n_b`
  - **Why:** It computes the sum directly with a simple formula, requiring minimal time and memory.

- **Simple & Space Efficient:** `sum_to_n_a`
  - **Why:** Uses a straightforward loop with constant memory usage.

- **Readable but Less Efficient:** `sum_to_n_c`
  - **Why:** Easy to understand due to recursion but can use a lot of memory for large \( n \) due to the function call stack.