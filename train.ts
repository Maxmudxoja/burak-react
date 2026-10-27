//MIT Tasks

//Z - TASK;

// function sumEvens(arr: number[]): number {
//   let sum = 0;

//   for (const num of arr) {
//     if (num % 2 === 0) {
//       sum += num;
//     }
//   }

//   return sum;
// }

// console.log(sumEvens([1, 2, 3]));

//Y-Task

// function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
//   const result: T[] = [];

//   for (const item of arr1) {
//     if (arr2.includes(item) && !result.includes(item)) {
//       result.push(item);
//     }
//   }

//   return result;
// }

// console.log(findIntersection([1, 2, 3], [3, 2, 0]));

// X-Task
// function countOccurrences(obj: Record<string, any>, key: string): number {
//   let count = 0;

//   for (const k in obj) {
//     if (k === key) {
//       count++;
//     }

//     if (typeof obj[k] === "object" && obj[k] !== null) {
//       count += countOccurrences(obj[k], key);
//     }
//   }

//   return count;
// }

// console.log(
//   countOccurrences(
//     { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
//     "model",
//   ),
// );
