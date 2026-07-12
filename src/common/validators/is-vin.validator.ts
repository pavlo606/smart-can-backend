import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

const VIN_LENGTH = 17

export const IsVin = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "IsVin",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string" || value.length !== VIN_LENGTH) return false

          if (value.match(/([^\W,I,O,Q]){17}/)) return true

          return false
        },
        defaultMessage() { return "Invalid vin code" }
      }
    })
  }
}