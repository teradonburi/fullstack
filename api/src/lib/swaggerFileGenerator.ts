import { OpenAPIObject } from '@nestjs/swagger';
import { writeFile, readFile } from 'fs/promises';

/**
 * Check if swagger.json is present, If the current swagger.json on disk differs from the one in memory,
 * then write the new one to disk.
 * @param swaggerDocument - The swagger document to write to file
 * @param logger - Logger, passed in from NestJS, as it can't be injected here.
 */
export const generateLocalSwaggerDocument = async (
  swaggerDocument: OpenAPIObject,
) => {
  if (!swaggerDocument) {
    console.error('No swagger document to write.');
    return;
  }

  try {
    // Read current file to ensure we only write If content has changed, or If it doesn't exist.
    const previousFileContent = await readFile(
      './src/api/swagger.json',
      'utf8',
    );
    const newContent = JSON.stringify(swaggerDocument, null, 2);

    if (previousFileContent !== newContent) {
      await writeFile('./swagger.json', newContent);
      console.info(
        'Swagger doc written successfully to ./src/api/swagger.json',
      );
    }
  } catch (err) {
    // If the file doesn't exist, (i.e manually deleted) then we wish to regenerate it.
    if (err.code === 'ENOENT') {
      await writeFile(
        './swagger.json',
        JSON.stringify(swaggerDocument, null, 2),
      );
    } else {
      console.error(`Error writing swagger json file: ${err}`);
    }
  }
};
