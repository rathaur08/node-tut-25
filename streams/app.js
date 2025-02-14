import { createReadStream, createWriteStream } from "fs";
import path from "path";

const inoutFilePath = path.join(import.meta.dirname, "input.txt");
const outputFilePath = path.join(import.meta.dirname, "output.txt");

const readableStream = createReadStream(inoutFilePath, {
  encoding: "utf-8",
  highWaterMark: 16,
})

const writableStream = createWriteStream(outputFilePath);

// listen for data chunks
readableStream.on("data", (chunk) => {
  console.log("Buffer (chunk):", Buffer.from(chunk))
  console.log("Received Chunk:", chunk);
  writableStream.write(chunk);
})

// handle stream end

readableStream.on("end", () => {
  console.log("File read Completed.")
  writableStream.end()
})

readableStream.on("error", (err) => console.error("Error", err))
writableStream.on("error", (err) => console.error("Error", err))
