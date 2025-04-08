import {
	createConfig,
	createTargetJSNoneOptions
} from "enkore/spec/factory"

export default createConfig({
	target: {
		name: "js-none",
		options: createTargetJSNoneOptions({
			exports: {
				"v0": {
					checkAgainstInterface: [
						"@enkore/spec",
						"EnkoreJSRuntimeAPI_V0"
					]
				}
			}
		})
	}
})
