import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // 빈 문자열도 유효성 검사 실패로 처리
          return value !== '' && value !== null && value !== undefined;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be empty string`;
        }
      },
    });
  };
}
