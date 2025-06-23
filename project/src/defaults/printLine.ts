import type {
	EnkoreJSRuntimeContextOptions
} from "@enkore/spec"

export const defaultPrintLine: NonNullable<EnkoreJSRuntimeContextOptions["printLine"]> = function(
	context, line
) {
	void context;

	// @ts-ignore:next-line
	if (typeof process === "object") {
		// @ts-ignore:next-line
		process.stderr.write(`${line}\n`)
	} else if (typeof console === "object") {
		console.log(line)
	}
}
