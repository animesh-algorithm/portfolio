import { validateKnowledge } from "./knowledge-lib";

async function main() {
  const errors = await validateKnowledge();
  if (errors.length) {
    console.error(`Knowledge validation failed:\n- ${errors.join("\n- ")}`);
    process.exitCode = 1;
  } else {
    console.log("Knowledge validation passed.");
  }
}

void main();
