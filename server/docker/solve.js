const { spawn ***REMOVED*** = require('child_process');

function getLanguageCommand(language, filename){
    switch(language){
        case "java":
            return "java "+filename;
        case "python":
            return "python3 "+filename;
        default:
            return "";
***REMOVED***
***REMOVED***

function getSolution(puzzleInput, code, language, filename) {
    const docker = spawn('docker', ['run', '-i', 'languages', '/bin/bash', '-c', `'echo ${code***REMOVED*** > ${filename***REMOVED*** && ${getLanguageCommand(language, filename)***REMOVED***'`]);

    let output = "";

    docker.stdout.on('data', (data) => {
        output = data;
        console.log(`stdout: ${data***REMOVED***`);
    ***REMOVED***;

    docker.stderr.on('data', (data) => {
        console.error(`stderr: ${data***REMOVED***`);
    ***REMOVED***;

    docker.on('close', (code) => {
        console.log(`child process exited with code ${code***REMOVED***`);
    ***REMOVED***;

***REMOVED***
***REMOVED***

module.exports = getSolution;
