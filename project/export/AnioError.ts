export class AnioError {
	readonly #originalErrorObject: unknown
	readonly message: string
	readonly stackTrace: string|undefined

	constructor(e: unknown) {
		let message = ""
		let stackTrace: string|undefined = undefined

		if (e instanceof Error) {
			message = e.message
			stackTrace = e.stack
		} else if (Object.prototype.toString.call(e) === `[object String]`) {
			message = e as string
		} else {
			try {
				message = `Value as JSON: ${JSON.stringify(e)}`
			} catch {
				message = ""
			}
		}

		this.message = message.length ? message : "(none)"
		this.#originalErrorObject = e
		this.stackTrace = stackTrace
	}

	getMessage(): string {
		return this.message
	}

	getStackTrace(): string {
		return this.stackTrace ?? ""
	}

	getOriginalErrorObject(): unknown {
		return this.#originalErrorObject
	}
}
