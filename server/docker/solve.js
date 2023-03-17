const { spawn } = require('child_process');
const fs = require('fs');

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

function runChildProcess(language, filename) {
    return new Promise((resolve, reject) => {
        const file = spawn('PowerShell', ['-Command', 'cat', filename]);
        const docker = spawn('docker', ['run', '-i', 'languages', '/bin/bash', '-c', `cat >> ${filename} && ${getLanguageCommand(language, filename)}`]);
        file.stdout.pipe(docker.stdin);

        let output = '';

        docker.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data;
            resolve(output);
        });

        docker.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data);
        });

        docker.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

async function getSolution(puzzleInput, code, language, filename) {
    console.log(puzzleInput, code, language, filename);
    console.log(getLanguageCommand(language, filename));

    fs.writeFileSync(filename, code, err => {
        console.log(err);
    })

    return await runChildProcess(language, filename);
}

module.exports = getSolution;
