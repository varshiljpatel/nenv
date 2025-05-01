#!/usr/bin/env node
import { encryptEnv, decryptEnv } from "./wrapper.js";
import { Command } from "commander";

const program = new Command("nenv");

// Set the version and description of the CLI tool
program.version("0.0.1").description("No need to manage .env files. Just use nenv!");

program
  .command("encrypt <secret>")
  .alias("e") // Shortcut alias for encrypt
  .alias("-e") // Another shortcut alias for encrypt
  .description("Encrypt .env to .nenv file")
  .option("--env <path>", "Path to the .env file", "./") // Default path is root
  .option("--name <filename>", "Name of the .env file", ".env") // Default file name is .env
  .option("--output <path>", "Output directory for the .nenv file", "./") // Default output is root
  .action((secret, options) => {
    const envPath = `${options.env}/${options.name}`; // Construct the full path to the .env file
    const outputPath = options.output; // Output directory for the .nenv file
    encryptEnv(envPath, secret, outputPath); // Call the encrypt function
    console.log(`Environment encrypted successfully to ${outputPath}/.nenv`);
  });

program
  .command("decrypt <secret>")
  .alias("d") // Shortcut alias for decrypt
  .alias("-d") // Another shortcut alias for decrypt
  .description("Decrypt .nenv to .env file")
  .option("--env <path>", "Path to the .nenv file", "./") // Default path is root
  .option("--name <filename>", "Name of the output .env file", ".env") // Default file name is .env
  .action((secret, options) => {
    const envPath = options.env; // Path to the .nenv file
    const outputName = options.name; // Name of the output .env file
    decryptEnv(envPath, secret, outputName); // Call the decrypt function
    console.log(
      `Environment decrypted successfully to ${envPath}/${outputName}`
    );
  });

// Parse the command-line arguments
program.parse(process.argv);
