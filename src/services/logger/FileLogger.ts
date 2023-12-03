var fs = require('fs');

export class FileLogger implements Logger {
    logDirectory = 'dungeonForge.log'
    log(message: string): void {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'America/Denver',
        };

        const enUSFormatter = new Intl.DateTimeFormat('en-US', options);
        const output = `${enUSFormatter.format(Date.now())} - ${JSON.stringify(message)}\n`
        fs.appendFile(this.logDirectory, output, async (err: Error) => {})
    }
}