export class Logger {
    static levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 } as const;
    static currentLevel: (typeof Logger.levels)[keyof typeof Logger.levels] = Logger.levels.DEBUG;


    static log(level: number, message: string) {
        if (level >= Logger.currentLevel) {
            const levelName = (Object.keys(Logger.levels) as (keyof typeof Logger.levels)[])
                .find(key => Logger.levels[key] === level);
            console.log(`[${levelName}] ${message}`);
        }
    }

    static debug(message: string) {
        Logger.log(Logger.levels.DEBUG, message);
    }

    static info(message: string) {
        Logger.log(Logger.levels.INFO, message);
    }

    static warn(message: string) {
        Logger.log(Logger.levels.WARN, message);
    }

    static error(message: string) {
        Logger.log(Logger.levels.ERROR, message);
    }

    static setLevel(level: (typeof Logger.levels)[keyof typeof Logger.levels]) {
        if (Object.values(Logger.levels).includes(level)) {
            Logger.currentLevel = level;
        } else {
            console.warn(`Invalid log level: ${level}`);
        }
    }
    
}
