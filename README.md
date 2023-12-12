# File Organizer

File Organizer is a command-line application that organizes files based on user-defined criteria such as file type, date created, or size. Additionally, it supports file filtering, allowing users to include or exclude specific file extensions during the organization process. The app provides a verbose mode to print additional information about the files being organized.

## Installation

```bash
git clone https://github.com/3BIK8/file-organizer-cli.git
cd file-organizer
npm install
```

## Usage

```bash
npm start -s <source_directory> -d <destination_directory> -c <criteria> [-i <include_extensions...>] [-e <exclude_extensions...>] [-v]
```

### Options

- `-s, --source <dir>`: Source directory containing files to organize (required).
- `-d, --destination <dir>`: Destination directory for organized files (required).
- `-c, --criteria <type>`: Organization criteria - type, date, or size (required).
- `-i, --include <exts...>`: Include only files with these extensions (optional).
- `-e, --exclude <exts...>`: Exclude files with these extensions (optional).
- `-v, --verbose`: Print verbose output (optional).

## Example

Organize files from the source directory "./source" to the destination directory "./destination" based on file type, including only ".jpg" and ".png" files, excluding ".txt" files, and printing verbose output:

```bash
npm start -s ./source -d ./destination -c type -i .jpg .png -e .txt -v
```
