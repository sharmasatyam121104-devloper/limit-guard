import { BookInterface, EmployeeInterface, MovieInterface, ProductInterface, StudentInterface } from "./playGround.interface";

export const getProducts = (): ProductInterface[] => {
  return [
    { id: 1, name: "Laptop", price: 65000 },
    { id: 2, name: "Mouse", price: 700 },
    { id: 3, name: "Keyboard", price: 1200 },
  ];
};

export const getStudents= (): StudentInterface[] => {
  return [
    { id: 1, name: "Rahul", course: "BCA" },
    { id: 2, name: "Priya", course: "B.Tech" },
    { id: 3, name: "Aman", course: "MBA" },
  ];
};


export const getEmployees = (): EmployeeInterface[] => {
  return [
    { id: 1, name: "John", department: "HR" },
    { id: 2, name: "David", department: "IT" },
    { id: 3, name: "Emma", department: "Finance" },
  ];
};


export const getMovies = (): MovieInterface[] => {
  return [
    { id: 1, title: "Inception", rating: 8.9 },
    { id: 2, title: "Avatar", rating: 8.2 },
    { id: 3, title: "Interstellar", rating: 8.7 },
  ];
};


export const getBooks = (): BookInterface[] => {
  return [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
    { id: 3, title: "Clean Code", author: "Robert Martin" },
  ];
};