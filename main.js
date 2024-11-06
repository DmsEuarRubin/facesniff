import { moduleInstaller } from './moduleInstaller.js';

const modules = [
    { name: 'readline', version: '1.3.0' },
    { name: 'gradient-string', version: '3.0.0' },
    { name: 'uuid', version: '11.0.2' },
    { name: '@faker-js/faker', version: '9.2.0' },
    { name: 'axios', version: '1.7.7' },
    { name: 'dns', version: '0.2.2' },
    { name: 'https', version: '1.0.0' },
    { name: 'os', version: '0.1.2' },
    { name: 'url', version: '0.11.4' },
    { name: 'unzipper', version: '0.12.3' },
    { name: 'got', version: '14.4.4' },
    //{ name: 'cloudflared', version: '0.5.3' },
];

moduleInstaller(modules).then(async () => {
        const { loadMenu } = await import('./loadMenu.js');
        loadMenu();
    }).catch((error) => { });