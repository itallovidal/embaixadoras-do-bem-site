import { ZodError } from 'zod'

export class ErrorEntity {
  constructor(
    public title: string,
    public description: string,
    public status: number,
    public details?: ZodError,
  ) {}

  getError() {
    const details = {
      code: this.details?.issues[0].code,
      message: this.details?.issues[0].message,
    }

    return {
      ...this,
      details,
    }
  }
}
