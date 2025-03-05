# Backend Developer Technical Test: Traveling Salesman Problem (TSP)

## Overview

The purpose of this test is to assess your problem-solving skills,
object-oriented programming (OOP) abilities, and approach to unfamiliar
challenges. You will be required to implement a solution for the Traveling
Salesman Problem (TSP) using TypeScript, focusing on clean code, efficiency,
and maintainability.

We are particularly interested in how you:

- **Break down a complex problem** and structure your solution.
- **Apply OOP principles** to create modular and reusable components.
- **Optimize performance** and reason about time complexity.
- **Explain your thought process** and decision-making.

## Problem Statement

The Traveling Salesman Problem (TSP) is defined as follows:

    Given a set of N cities and the distances between each pair of cities, find
    the shortest possible route that visits each city exactly once and returns
    to the starting city.

This problem is known to be NP-hard, meaning an exact solution may not be
computationally feasible for large numbers of cities. Your goal is to implement
an approximate or exact solution using OOP principles.

## Test Format

- **Duration:** 2 to 4 days for independent problem-solving.
- **Deliverables:**
    1. Fork this repository and implement a TSP solver following **OOP principles**.
    2. A **RATIONALE.md** document explaining your approach, assumptions, and trade-offs.
    3. A **live discussion session** where you explain your reasoning and answer
       follow-up questions.

## Requirements

#### **Functional Requirements**

1. TSP Solver Implementation
    - Implement a method that solves the TSP given a set of cities and their
      distances.
    - The method should return the ordered list of cities in the computed
      route, along with the total distance.
    - Ensure your solution is efficient for at least N = 10 cities.
2. City Distance Calculation
    - Implement logic to calculate the distances between randomly generated
      cities in a 2D plane.
3. REST API Endpoints
    - Implement the missing logic for the two API endpoints:
        - POST /api/tsp/solve: Should compute the shortest route for a given set of
          cities.
        - POST /api/tsp/generate-cities: Should generate a set of random cities in a
          bounded 2D space and calculate their distances.
4. Performance Considerations
    - Your solution does not need to be optimal, but it should demonstrate
      reasoned trade-offs between efficiency and correctness.
    - If implementing an approximate algorithm (e.g., Nearest Neighbor, Genetic
      Algorithm), document your rationale and performance expectations.

#### **Technical Constraints**

- The solution must be written in TypeScript.
- Follow object-oriented programming (OOP) principles.
- Ensure the code is structured, modular, and maintainable.
- Include unit tests to verify correctness.

## Provided Boilerplate Code

A NestJS-based service API has been provided to allow you to focus on
implementing the TSP solution. The API exposes the endpoints:

- POST /api/tsp/solve → Accepts a list of cities and their distances.
- POST /api/tsp/generate-cities → Generates random cities on a 2D plane.

You will primarily work in the `src/tsp/domain/tsp-solver/` directory, where most of
the implementation of your solution should reside.

## How to Run the Project

**1. Install dependencies:**

```shell
npm install
```

**2. Start the server**

```shell
npm run start
```
