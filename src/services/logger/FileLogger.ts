var fs = require('fs');

export class FileLogger implements Logger {
    logDirectory = 'dungeonForge.log'
    log(message: string): void {
        const enUSFormatter = new Intl.DateTimeFormat('en-US');
        const output = `${enUSFormatter.format(Date.now())} - ${message}`
        fs.appendFile(this.logDirectory, output, async (err: Error) => {})
    }
}