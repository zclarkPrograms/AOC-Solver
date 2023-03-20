# Advent of Code Solver
This is a personal project I made to understand JavaScript fullstack development.

## Advent of Code
Advent of Code is a yearly event taking place from December 1 to December 25. Each day of the event, programming challenges are released on the [website](https://adventofcode.com/). Each challenge provides input data that must be turned into the correct output data. The answer is then entered into a text box by the user.

## Solver
This program allows the user to select a specific challenge and submit the puzzle input to a server, which then solves the challenge and provides the answer to the user. The solution files are stored on a remote mangodb server and the programs are run on an ubuntu container.

## Technologies
* React: frontend
* Express: backend; bodyparser and cors were used as middleware
* Mongodb: database that stores the solution files
* Docker: an Ubuntu container is used to run programs in various languages

## Setup
Install node\
Install packages `npm install react-scripts express body-parser cors mongoose`