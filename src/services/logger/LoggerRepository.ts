export class LoggerRepository {
    loggers: Logger[]

    constructor(loggers: Logger[]) {
        this.loggers = loggers
    }

    log(message:string) {
        this.loggers.forEach(element => {
            element.log(message)
        });
    }
}