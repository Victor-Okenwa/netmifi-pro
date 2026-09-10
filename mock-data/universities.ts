import type { University } from "./types";

export const UNIVERSITIES: University[] = [
	{
		id: "imt",
		name: "Institute of Management and Technology",
		shortName: "IMT",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computing", code: "COM 111" },
					{ name: "Computer Programming I", code: "COM 112" },
					{ name: "Computer Programming II", code: "COM 211" },
					{ name: "Data Structures", code: "COM 212" },
					{ name: "Database Systems", code: "COM 311" },
					{ name: "Web Application Development", code: "COM 312" },
					{ name: "Operating Systems", code: "COM 411" },
					{ name: "Software Engineering", code: "COM 412" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Elementary Statistics", code: "STA 111" },
					{ name: "Probability Theory", code: "STA 211" },
					{ name: "Statistical Inference", code: "STA 311" },
				],
			},
			{
				name: "Accountancy",
				courses: [
					{ name: "Principles of Accounts", code: "ACC 111" },
					{ name: "Financial Accounting", code: "ACC 211" },
					{ name: "Cost Accounting", code: "ACC 311" },
				],
			},
		],
	},
	{
		id: "unn",
		name: "University of Nigeria Nsukka",
		shortName: "UNN",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computer Science", code: "COS 101" },
					{ name: "Computer Programming I", code: "COS 102" },
					{ name: "Computer Programming II", code: "COS 201" },
					{ name: "Data Structures and Algorithms", code: "COS 202" },
					{ name: "Computer Architecture", code: "COS 301" },
					{ name: "Operating Systems", code: "COS 302" },
					{ name: "Database Design", code: "COS 341" },
					{ name: "Software Engineering", code: "COS 342" },
					{ name: "Artificial Intelligence", code: "COS 441" },
				],
			},
			{
				name: "Mathematics",
				courses: [
					{ name: "Elementary Mathematics I", code: "MTH 111" },
					{ name: "Elementary Mathematics II", code: "MTH 121" },
					{ name: "Linear Algebra", code: "MTH 211" },
					{ name: "Matrices and Determinants", code: "MTH 221" },
					{ name: "Real Analysis", code: "MTH 311" },
					{ name: "Abstract Algebra", code: "MTH 321" },
					{ name: "Complex Analysis", code: "MTH 411" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Introduction to Statistics", code: "STA 111" },
					{ name: "Probability I", code: "STA 211" },
					{ name: "Statistical Methods", code: "STA 311" },
					{ name: "Regression Analysis", code: "STA 411" },
				],
			},
			{
				name: "Economics",
				courses: [
					{ name: "Principles of Economics I", code: "ECO 101" },
					{ name: "Principles of Economics II", code: "ECO 102" },
					{ name: "Microeconomic Theory", code: "ECO 201" },
					{ name: "Macroeconomic Theory", code: "ECO 202" },
					{ name: "Econometrics", code: "ECO 341" },
				],
			},
		],
	},
	{
		id: "ui",
		name: "University of Ibadan",
		shortName: "UI",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computing", code: "CSC 101" },
					{ name: "Problem Solving", code: "CSC 102" },
					{ name: "Object-Oriented Programming", code: "CSC 201" },
					{ name: "Data Structures", code: "CSC 242" },
					{ name: "Database Systems", code: "CSC 331" },
					{ name: "Computer Networks", code: "CSC 341" },
					{ name: "Compiler Construction", code: "CSC 431" },
				],
			},
			{
				name: "Mathematics",
				courses: [
					{ name: "Algebra", code: "MAT 111" },
					{ name: "Calculus", code: "MAT 121" },
					{ name: "Linear Algebra", code: "MAT 211" },
					{ name: "Ordinary Differential Equations", code: "MAT 221" },
					{ name: "Numerical Analysis", code: "MAT 321" },
				],
			},
			{
				name: "Economics",
				courses: [
					{ name: "Introductory Economics I", code: "ECO 101" },
					{ name: "Introductory Economics II", code: "ECO 102" },
					{ name: "Microeconomics", code: "ECO 201" },
					{ name: "Macroeconomics", code: "ECO 202" },
					{ name: "Development Economics", code: "ECO 351" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Introductory Statistics", code: "STA 121" },
					{ name: "Probability Distributions", code: "STA 211" },
					{ name: "Statistical Inference", code: "STA 311" },
				],
			},
		],
	},
	{
		id: "unilag",
		name: "University of Lagos",
		shortName: "UNILAG",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computer Science", code: "CSC 111" },
					{ name: "Computer Programming", code: "CSC 120" },
					{ name: "Data Structures", code: "CSC 220" },
					{ name: "Computer Organisation", code: "CSC 314" },
					{ name: "Database Management", code: "CSC 322" },
					{ name: "Software Engineering", code: "CSC 411" },
					{ name: "Artificial Intelligence", code: "CSC 422" },
				],
			},
			{
				name: "Mathematics",
				courses: [
					{ name: "General Mathematics I", code: "MTH 111" },
					{ name: "General Mathematics II", code: "MTH 112" },
					{ name: "Linear Algebra I", code: "MTH 211" },
					{ name: "Real Analysis I", code: "MTH 311" },
					{ name: "Complex Analysis", code: "MTH 411" },
				],
			},
			{
				name: "Economics",
				courses: [
					{ name: "Principles of Economics I", code: "ECO 111" },
					{ name: "Principles of Economics II", code: "ECO 112" },
					{ name: "Microeconomics", code: "ECO 211" },
					{ name: "Macroeconomics", code: "ECO 212" },
					{ name: "Public Finance", code: "ECO 321" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Introduction to Statistics", code: "STA 111" },
					{ name: "Probability", code: "STA 211" },
					{ name: "Applied Statistics", code: "STA 311" },
				],
			},
		],
	},
	{
		id: "unical",
		name: "University of Calabar",
		shortName: "UNICAL",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computer Science", code: "CSC 111" },
					{ name: "Structured Programming", code: "CSC 121" },
					{ name: "Data Structures", code: "CSC 211" },
					{ name: "Database Systems", code: "CSC 311" },
					{ name: "Systems Analysis and Design", code: "CSC 321" },
					{ name: "Computer Networks", code: "CSC 411" },
				],
			},
			{
				name: "Mathematics",
				courses: [
					{ name: "General Mathematics I", code: "MTH 111" },
					{ name: "General Mathematics II", code: "MTH 121" },
					{ name: "Linear Algebra", code: "MTH 211" },
					{ name: "Vector Analysis", code: "MTH 221" },
					{ name: "Numerical Methods", code: "MTH 321" },
				],
			},
			{
				name: "Economics",
				courses: [
					{ name: "Introduction to Economics I", code: "ECO 111" },
					{ name: "Introduction to Economics II", code: "ECO 121" },
					{ name: "Microeconomic Analysis", code: "ECO 211" },
					{ name: "Nigerian Economy", code: "ECO 311" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Basic Statistics", code: "STA 111" },
					{ name: "Probability Theory", code: "STA 211" },
					{ name: "Statistical Inference", code: "STA 311" },
				],
			},
		],
	},
	{
		id: "unizik",
		name: "Nnamdi Azikiwe University",
		shortName: "UNIZIK",
		categories: [
			{
				name: "Computer Science",
				courses: [
					{ name: "Introduction to Computer Science", code: "CSC 101" },
					{ name: "Computer Programming I", code: "CSC 102" },
					{ name: "Computer Programming II", code: "CSC 201" },
					{ name: "Data Structures", code: "CSC 202" },
					{ name: "Database Management Systems", code: "CSC 301" },
					{ name: "Operating Systems", code: "CSC 302" },
					{ name: "Software Engineering", code: "CSC 401" },
					{ name: "Computer Networks", code: "CSC 402" },
				],
			},
			{
				name: "Mathematics",
				courses: [
					{ name: "Elementary Mathematics I", code: "MTH 101" },
					{ name: "Elementary Mathematics II", code: "MTH 102" },
					{ name: "Linear Algebra", code: "MTH 201" },
					{ name: "Calculus", code: "MTH 202" },
					{ name: "Real Analysis", code: "MTH 301" },
					{ name: "Abstract Algebra", code: "MTH 401" },
				],
			},
			{
				name: "Economics",
				courses: [
					{ name: "Principles of Economics I", code: "ECO 101" },
					{ name: "Principles of Economics II", code: "ECO 102" },
					{ name: "Microeconomics", code: "ECO 201" },
					{ name: "Macroeconomics", code: "ECO 202" },
					{ name: "Monetary Economics", code: "ECO 301" },
				],
			},
			{
				name: "Statistics",
				courses: [
					{ name: "Introduction to Statistics", code: "STA 101" },
					{ name: "Probability and Distribution", code: "STA 201" },
					{ name: "Statistical Inference", code: "STA 301" },
				],
			},
		],
	},
];

/**
 * Finds a university catalog by id.
 * @param id - Stable university slug
 * @returns The university, or `undefined` if the id is unknown
 */
export function getUniversityById(id: University["id"]): University | undefined {
	return UNIVERSITIES.find((university) => university.id === id);
}
