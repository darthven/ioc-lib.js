import Component from './Component';
import fs = require('fs');
import path = require('path');

class ComponentScanner {

  private paths: string[];

  constructor(paths: string[]) {
    this.paths = paths;
  }

  public setPaths(paths: string[]): void {
    this.paths = paths;
  }

  public getPaths(): string[] {
    return this.paths;
  }

  public scanComponents() {
      /*TODO Here should be the logic of scanning components
        by paths mentioned in config-files
      */
  }
}

export default ComponentScanner;
