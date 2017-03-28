class ComponentNotFoundError extends Error {
    constructor(message) {
    super(message);
    this.name = 'ComponentNotFoundError';
  }
}

export default ComponentNotFoundError;
