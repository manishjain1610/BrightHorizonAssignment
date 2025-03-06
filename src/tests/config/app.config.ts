import path from 'path';
import config from '../../../playwright.config';

export function loadJsonFile(filename: string): any {
  return require(path.resolve(config.testDataDir, filename));
}

let testData = loadJsonFile('testdata.json');

// Test Data From JSON File
export const APPLICATION_URL = testData.appUrl;
export const CHILD_CARE_URL = testData.childCareUrl;
export const SEARCH_LOCATION = testData.searchLocation;
export const SEARCH_RESOURCE = testData.searchResource;
