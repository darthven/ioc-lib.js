/**
 * Class of error that describes situation when metadata validation
 * from configuration files was failed
 */
class MetadataValidationError extends Error {
    constructor(pathToConfigurationFile: string) {
        const message = `Metadata validation was failed in file "${pathToConfigurationFile}".`;
        super(message);
        this.name = 'MetadataValidationError';
    }
}

export default MetadataValidationError;
