import { encryptEnv as encrypt_env, decryptEnv as decrypt_env } from '../index.js';

/**
 * Encrypts the contents of a .env file and writes the encrypted data to a .nenv file.
 *
 * @param {string} envPath - The full path to the .env file to be encrypted.
 * @param {string} secret - The secret key used for encryption.
 * @param {string} outputPath - The directory where the .nenv file will be saved.
 * @throws Will throw an error if the .env file does not exist.
 */
export function encryptEnv(envPath, secret, outputPath) {
  const fs = require('fs');
  const path = require('path');

  // Check if the .env file exists
  if (!fs.existsSync(envPath)) {
    throw new Error(`The .env file at ${envPath} does not exist.`);
  }

  // Read the contents of the .env file
  const content = fs.readFileSync(envPath, 'utf8');

  // Encrypt the contents using the provided secret
  const encrypted = encrypt_env(content, secret);

  // Construct the full path to the output .nenv file
  const outputFilePath = path.join(outputPath, '.nenv');

  // Write the encrypted data to the .nenv file
  fs.writeFileSync(outputFilePath, encrypted);

  // Update the .gitignore file to include the .nenv file
  updateGitignore(outputFilePath);
}

/**
 * Decrypts the contents of a .nenv file and writes the decrypted data to a .env file.
 *
 * @param {string} envPath - The directory where the .nenv file is located.
 * @param {string} secret - The secret key used for decryption.
 * @param {string} outputName - The name of the output .env file.
 * @throws Will throw an error if the .nenv file does not exist.
 */
export function decryptEnv(envPath, secret, outputName) {
  const fs = require('fs');
  const path = require('path');

  // Construct the full path to the .nenv file
  const nenvFilePath = path.join(envPath, '.nenv');

  // Check if the .nenv file exists
  if (!fs.existsSync(nenvFilePath)) {
    throw new Error(`The .nenv file at ${nenvFilePath} does not exist.`);
  }

  // Read the contents of the .nenv file
  const encrypted = fs.readFileSync(nenvFilePath, 'utf8');

  // Decrypt the contents using the provided secret
  const decrypted = decrypt_env(encrypted, secret);

  // Construct the full path to the output .env file
  const outputFilePath = path.join(envPath, outputName);

  // Write the decrypted data to the .env file
  fs.writeFileSync(outputFilePath, decrypted);
}

/**
 * Updates the .gitignore file to include the specified file path.
 *
 * @param {string} filePath - The file path to be added to the .gitignore file.
 */
function updateGitignore(filePath) {
  const fs = require('fs');
  const path = require('path');

  // Resolve the path to the .gitignore file
  const gitignorePath = path.resolve('.gitignore');
  let content = '';

  // Read the existing contents of the .gitignore file, if it exists
  if (fs.existsSync(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf8');
  }

  // Get the relative path of the file to be added
  const relativeFilePath = path.relative(process.cwd(), filePath);

  // Append the file path to the .gitignore file if it's not already included
  if (!content.includes(relativeFilePath)) {
    fs.appendFileSync(gitignorePath, `\n${relativeFilePath}\n`);
  }
}