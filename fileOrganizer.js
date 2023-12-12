const fs = require("fs");
const path = require("path");
const { program } = require("commander");

const organizeFiles = (
	sourceDir,
	destinationDir,
	criteria,
	includeExt,
	excludeExt,
	verbose
) => {
	try {
		const files = fs.readdirSync(sourceDir);

		files.forEach((file) => {
			const filePath = path.join(sourceDir, file);
			const stats = fs.statSync(filePath);

			const fileExt = path.extname(file).toLowerCase();

			if (includeExt && !includeExt.includes(fileExt)) {
				return; // Skip files not in include list
			}

			if (excludeExt && excludeExt.includes(fileExt)) {
				return; // Skip files in exclude list
			}

			let destinationFolder = destinationDir;

			if (criteria === "type") {
				destinationFolder = path.join(destinationDir, fileExt);
			} else if (criteria === "date") {
				const year = stats.birthtime.getFullYear();
				const month = String(stats.birthtime.getMonth() + 1).padStart(2, "0");
				destinationFolder = path.join(destinationDir, `${year}-${month}`);
			} else if (criteria === "size") {
				const fileSize = stats.size;
				destinationFolder = path.join(
					destinationDir,
					getFileSizeCategory(fileSize)
				);
			}

			if (!fs.existsSync(destinationFolder)) {
				fs.mkdirSync(destinationFolder, { recursive: true });
			}

			const destinationPath = path.join(destinationFolder, file);
			fs.renameSync(filePath, destinationPath);

			if (verbose) {
				console.log(`Moved: ${filePath} -> ${destinationPath}`);
			}
		});

		console.log("Files organized successfully!");
	} catch (error) {
		console.error("Error organizing files:", error.message);
		process.exit(1);
	}
};

const getFileSizeCategory = (size) => {
	if (size < 1024) {
		return "small";
	} else if (size < 1024 * 1024) {
		return "medium";
	} else {
		return "large";
	}
};

program.version("1.1.0").description("Enhanced File Organizer App");

program
	.requiredOption(
		"-s, --source <dir>",
		"Source directory containing files to organize"
	)
	.requiredOption(
		"-d, --destination <dir>",
		"Destination directory for organized files"
	)
	.requiredOption(
		"-c, --criteria <type>",
		"Organization criteria: type, date, or size"
	)
	.option("-i, --include <exts...>", "Include only files with these extensions")
	.option("-e, --exclude <exts...>", "Exclude files with these extensions")
	.option("-v, --verbose", "Print verbose output")
	.action(() => {
		const { source, destination, criteria, include, exclude, verbose } =
			program.opts();
		organizeFiles(source, destination, criteria, include, exclude, verbose);
	});

program.parse(process.argv);
