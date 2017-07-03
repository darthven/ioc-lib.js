import jsonfile = require('jsonfile');
import path = require('path');
import fs = require('fs');

class MetadataValidator {

    private static logger = require('log4js').getLogger();

    private static configurationFilesExist(paths: string[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            paths.forEach((path) => {
                fs.stat(path, (err) => {
                    if(err === null) {
                        MetadataValidator.logger.debug(`Configuration file by path ${path} was found`);
                    } else {
                        MetadataValidator.logger.error(`Cannot read the file by the following path: ${path}. 
                        Error code: ${err.code}`);
                        reject(false);
                    }
                });
            });
            resolve(true);
        });
    }


    private static validateConfigurationFiles(paths: string[]): Promise<Object[]> {
        return MetadataValidator.configurationFilesExist(paths).then((filesExist) => {
            if(filesExist) {
                let configFiles = [];
                paths.forEach((path) => {
                    configFiles.push(jsonfile.readFileSync(path));
                });
                return configFiles;
            }
            return null;
        });
    }

    private static validateConfigurationKeyword(paths: string[]): Promise<boolean> {
        return MetadataValidator.validateConfigurationFiles(paths).then((configFiles) => {
           if(configFiles != null) {
                configFiles.forEach((file) => {
                    let configurationKeyword = file['configuration'];
                    if(!configurationKeyword) {
                        return false;
                    }
                });
               return true;
           }
           return false;
        });
    }

    private static validateComponentsKeyword(configFiles: Object[]) {

    }

    private static validateConfigComponent() {

    }

    private static validateConfigLifecycle() {

    }

    private static validateConfigProperties() {

    }

    private static validateConfigScope() {

    }

}

export default MetadataValidator;