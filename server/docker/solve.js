const { spawn } = require('child_process');
const fs = require('fs');

function getProgramName(language){
    switch (language) {
        case "javascript":
            return "node";
        default:
            return language;
    }
}

function getLanguageCommand(puzzleInput, language, filename) {
    const programName = getProgramName(language);

    return `${programName} ${filename} "${puzzleInput}"`;
}

function runChildProcess(puzzleInput, language, filename) {
    return new Promise((resolve, reject) => {
        const file = spawn('PowerShell', ['-Command', 'cat', filename]);
        const docker = spawn('docker', ['run', '-i', 'languages', '/bin/bash', '-c', `cat > ${filename} && ${getLanguageCommand(puzzleInput, language, filename)}`]);
        file.stdout.pipe(docker.stdin);

        let output = '';

        docker.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data;
            resolve(output);
        });

        docker.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject("" + data);
        });

        docker.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

async function getSolution(puzzleInput, code, language, filename) {
    fs.writeFileSync(filename, code, err => {
        console.log(err);
    })

    let output = "";

    try {
        output = await runChildProcess(puzzleInput, language, filename);
    }
    catch (err) {
        console.log(err);
    }

    fs.rm(filename, () => {
        console.log(`File ${filename} was deleted`);
    })

    return output;
}

module.exports = getSolution;
