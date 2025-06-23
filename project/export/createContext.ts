import type {
	EnkoreJSRuntimeContextOptions,
	EnkoreJSRuntimeContext,
	UnknownEntity
} from "@anio-software/enkore-private.spec"

import {
	createRuntimeContext as createRuntimeContextV0
} from "#~src/v0/createRuntimeContext.ts"

type MajorVersionsOf<T> = T extends UnknownEntity ? T["entityMajorVersion"] : never
type MajorVersions = MajorVersionsOf<EnkoreJSRuntimeContext>

type Map = {
	[Version in MajorVersions]: Extract<EnkoreJSRuntimeContext, {
		entityMajorVersion: Version
	}>
}

export function createContext<Version extends MajorVersions>(
	options: EnkoreJSRuntimeContextOptions,
	version: Version
): Map[Version] {
	if (version === 0) {
		return createRuntimeContextV0(options)
	}

	throw new Error(`Unknown context version '${version}'.`)
}
