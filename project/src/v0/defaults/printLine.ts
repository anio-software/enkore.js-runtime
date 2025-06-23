import type {
	EnkoreJSRuntimeContextOptions
} from "@anio-software/enkore-private.spec"

export const defaultPrintLine: NonNullable<EnkoreJSRuntimeContextOptions["printLine"]> = function(
	context, line
) {
	void context;

	if (typeof process === "object") {
		process.stderr.write(`${line}\n`)
	} else if (typeof console === "object") {
		console.log(line)
	}
}
