import type {
	EnkoreJSRuntimeContextOptions
} from "@anio-software/enkore-private.spec"
import {defaultShouldLog} from "./shouldLog.ts"
import {defaultPrintLine} from "./printLine.ts"

export const defaultLogWithLevel: NonNullable<EnkoreJSRuntimeContextOptions["logWithLevel"]> = function(
	context, level, lines
) {
	const tag = context.options.tag ?? ""
	const pkg = context.originatingPackage

	// exit early if we don't want to log message
	if (!context.options.shouldLog) {
		if (!defaultShouldLog(context, level, pkg, tag)) {
			return
		}
	} else if (context.options.shouldLog(context, level, pkg, tag) !== true) {
		return
	}

	let packageName = `<${pkg.name}>`

	if (pkg.name !== context.currentProject.packageJSON.name) {
		packageName = `<${context.currentProject.packageJSON.name}> (${pkg.name})`
	}

	// todo: add bundle identifier?
	let firstLine = `[${level.padStart(5, " ")}] ${packageName} `
	let padding = " ".repeat(firstLine.length)

	const logMessage = lines.map(arg => {
		return arg.toString()
	}).join("\n")

	const logLines = logMessage.split("\n")

	let str = ``

	for (let i = 0; i < logLines.length; ++i) {
		let currentLine = padding

		if (i === 0) {
			currentLine = firstLine
		}

		currentLine += logLines[i]

		str += `${currentLine}\n`
	}

	const result = str.slice(0, str.length - 1)

	if (!context.options.printLine) {
		defaultPrintLine(context, result)

		return
	}

	context.options.printLine(context, result)
}
