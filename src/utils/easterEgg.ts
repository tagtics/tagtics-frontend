// Easter egg console art for Tagtics
export const showEasterEgg = () => {
    const styles = {
        ascii: 'font-size: 10px; font-weight: bold; background: linear-gradient(90deg, #667eea, #764ba2, #f093fb); -webkit-background-clip: text; background-clip: text; color: transparent; font-family: monospace; line-height: 1.2;',
        box: 'font-size: 12px; color: #9ca3af; line-height: 1.2;',
        tech: 'font-size: 11px; color: #9ca3af;'
    };

    const asciiArt = `
 ████████╗ █████╗  ██████╗ ████████╗██╗ ██████╗███████╗
 ╚══██╔══╝██╔══██╗██╔════╝ ╚══██╔══╝██║██╔════╝██╔════╝
    ██║   ███████║██║  ███╗   ██║   ██║██║     ███████╗
    ██║   ██╔══██║██║   ██║   ██║   ██║██║     ╚════██║
    ██║   ██║  ██║╚██████╔╝   ██║   ██║╚██████╗███████║
    ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝╚══════╝
`;

    console.log(
        `%c${asciiArt}` +
        `\n\n%c┌─────────────────────────────────────┐` +
        `\n│  Capture. Analyze. Improve.         │` +
        `\n│  Real-time feedback from real users │` +
        `\n└─────────────────────────────────────┘` +
        `\n\n%c Built with React + Zustand + TypeScript + Vite` +
        `\n Powered by Framer Motion, AOS, Vanta & Tailwind CSS`,

        styles.ascii,
        styles.box,
        styles.tech
    );
};
