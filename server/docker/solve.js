const { spawn } = require('child_process');

function getLanguageCommand(language, filename){
    switch(language){
        case "java":
            return "java "+filename;
        case "python":
            return "python3 "+filename;
        default:
            return "";
    }
}

function getSolution(puzzleInput, code, language, filename) {
    const docker = spawn('docker', ['run', '-i', 'languages', '/bin/bash', '-c', `'echo ${code} > ${filename} && ${getLanguageCommand(language, filename)}'`]);

    let output = "";

    docker.stdout.on('data', (data) => {
        output = data;
        console.log(`stdout: ${data}`);
    });

    docker.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    docker.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    return output;
}

module.exports = getSolution;
