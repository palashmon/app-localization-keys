/**
 * The following lines initialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
import * as dotenv from "dotenv";
import acronymer from "acronymer";
import * as fs from "node:fs";
import { englishStrings } from "Utils/get-localization-strings-en";
import { spanishStrings } from "Utils/get-localization-strings-es";

// Initialize dotenv
dotenv.config();

// Function to generate localization keys
function generateLocalizationKeys(language: string, strings: string[]) {
  const localizationKeys: Record<string, string> = {};

  // Generate keys for each string
  strings.forEach((str) => {
    const acronym = acronymer(str); // Generate acronym using acronymer
    const key = `${language}_${acronym}`; // Combine language code with acronym to create key
    localizationKeys[key] = str; // Assign string to key
  });

  return localizationKeys;
}

// Generate English localization keys
const englishLocalizationKeys = generateLocalizationKeys("en", englishStrings);

// Write English localization keys to JSON file
fs.writeFileSync("dist/localization_en.json", JSON.stringify(englishLocalizationKeys, null, 2));

// Generate Spanish localization keys
const spanishLocalizationKeys = generateLocalizationKeys("es", spanishStrings);

// Write Spanish localization keys to JSON file
fs.writeFileSync("dist/localization_es.json", JSON.stringify(spanishLocalizationKeys, null, 2));

console.log("Localization keys generated successfully.");
