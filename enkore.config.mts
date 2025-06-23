import {defineConfig} from "@anio-software/enkore"
import {defineTargetOptions} from "@anio-software/enkore.target-js-hybrid"

export const config: unknown = defineConfig({
	target: {
		name: "js-hybrid",
		options: defineTargetOptions({
			_disableRuntimeCodeInjection: true,

			registry: {
				"anioSoftware": {
					url: "https://npm-registry.anio.software",
					authTokenFilePath: "secrets/anio_npm_auth_token",
					clientPrivateKeyFilePath: "secrets/npm_client.pkey",
					clientCertificateFilePath: "secrets/npm_client.cert"
				}
			},

			packageSourceRegistryByScope: {
				"@anio-software": {
					registry: "anioSoftware"
				}
			},

			exports: {
				"v0": {
					checkAgainstInterface: [
						"@anio-software/enkore-private.spec",
						"EnkoreJSRuntimeAPI_V0"
					]
				}
			},

			publish: [{
				registry: "anioSoftware"
			}]
		})
	}
})
