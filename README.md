# nenv

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)  
[![npm version](https://img.shields.io/npm/v/@varshiljpatel/nenv.svg)](https://www.npmjs.com/package/@varshiljpatel/nenv)  
<!-- [![Build Status](https://img.shields.io/github/actions/workflow/status/varshiljpatel/nenv/build.yml?branch=main)](https://github.com/varshiljpatel/nenv/actions) -->

## Problem Statement

Managing `.env` files in modern applications can be cumbersome and error-prone. Developers often face challenges such as:

- Accidentally committing sensitive `.env` files to version control.
- Manually managing `.env` files across multiple environments (e.g., development, staging, production).
- Lack of encryption for `.env` files, leaving sensitive data exposed.

These issues can lead to security vulnerabilities, inefficiencies, and unnecessary complexity in managing environment variables.

---

## Solution: `nenv`

`nenv` is a CLI tool designed to simplify and secure the management of `.env` files. With `nenv`, you can:

- **Encrypt** your `.env` files into `.nenv` files, ensuring sensitive data is protected.
- **Decrypt** `.nenv` files back into `.env` files when needed.
- Specify custom paths and filenames for `.env` and `.nenv` files.
- Automatically update your `.gitignore` file to exclude `.nenv` files from version control.

`nenv` ensures that your environment variables are secure and easy to manage across different environments.

---

## Features

- 🔒 **Encryption**: Securely encrypt `.env` files into `.nenv` files using AES-256 encryption.
- 🔓 **Decryption**: Decrypt `.nenv` files back into `.env` files when needed.
- 📂 **Custom Paths**: Specify custom paths and filenames for `.env` and `.nenv` files.
- 🛠️ **Cross-Platform**: Works seamlessly on Windows, macOS, and Linux.
- 📜 **Automatic `.gitignore` Updates**: Automatically adds `.nenv` files to your `.gitignore` file to prevent accidental commits.

---

## Installation

You can install `nenv` using your favorite package manager:

### npm

```bash
npm install -g @varshiljpatel/nenv
```

### pnpm

```bash
pnpm add -g @varshiljpatel/nenv
```

### yarn

```bash
yarn global add @varshiljpatel/nenv
```

### bun

```bash
bun add -g @varshiljpatel/nenv
```

---

> You can also access the cli via ```nenv ...``` and ```no.env ...``` command.

## Usage

### Encrypting `.env` Files

To encrypt a `.env` file into a `.nenv` file, use the `encrypt` command:

```bash
nenv encrypt <password>
```

#### Options:

- `--env <path>`: Path to the `.env` file (default: `./`).
- `--name <filename>`: Name of the `.env` file (default: `.env`).
- `--output <path>`: Directory where the `.nenv` file will be saved (default: `./`).

#### Example:

```bash
nenv encrypt mypassword --env=./src/frontend --name=.env.local --output=./src/frontend
```

This command:

- Encrypts the `.env.local` file located in `./src/frontend`.
- Saves the encrypted `.nenv` file in the `./src/frontend` directory.

---

### Decrypting `.nenv` Files

To decrypt a `.nenv` file back into a `.env` file, use the `decrypt` command:

```bash
nenv decrypt <password>
```

#### Options:

- `--env <path>`: Path to the `.nenv` file (default: `./`).
- `--name <filename>`: Name of the output `.env` file (default: `.env`).

#### Example:

```bash
nenv decrypt mypassword --env=./src/frontend --name=.env.local
```

This command:

- Decrypts the `.nenv` file located in `./src/frontend`.
- Saves the decrypted `.env.local` file in the same directory.

---

### Automatic `.gitignore` Updates

`nenv` automatically updates your `.gitignore` file to include the `.nenv` file. This ensures that encrypted files are not accidentally committed to version control.

---

## How It Works

### Encryption

1. Reads the contents of the `.env` file.
2. Encrypts the contents using AES-256 encryption with a user-provided password.
3. Saves the encrypted data as a `.nenv` file in the specified output directory.

### Decryption

1. Reads the contents of the `.nenv` file.
2. Decrypts the contents using AES-256 decryption with the same password used for encryption.
3. Saves the decrypted data as a `.env` file in the specified directory.

---

## Supported Platforms

`nenv` is built using Rust and Node.js, making it compatible with the following platforms:

- Windows
- macOS
- Linux

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

---

## Author

This project is developed and maintained by **Varshil J Patel**.

- GitHub: [@varshiljpatel](https://github.com/varshiljpatel)
- Email: varshil.dev@gmail.com

---

## Acknowledgments

- Built with ❤️ using Rust and Node.js.
- Inspired by the need for secure and efficient environment variable management.

---

## Feedback

If you encounter any issues or have suggestions for improvement, please open an issue on the [GitHub repository](https://github.com/varshiljpatel/nenv/issues).

---

## Keywords

- `nenv`
- `.nenv`
- `environment variables`
- `secure env management`
- `encryption`
- `decryption`
- `node.js`
- `rust`

---

## Future Plans

- Add support for additional encryption algorithms.
- Provide a GUI for managing `.env` and `.nenv` files.
- Add integration with cloud-based secret management tools.

---

Thank you for using `nenv`! 🎉