export function ifUndefinedThrowError<Value>(value: Value | undefined, message: string = 'Value is undefined'): Value {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
}

function check<Value>(name: string, defaultValue: undefined | Value): Value {
  return ifUndefinedThrowError(defaultValue, `Environment variable '${name}' is undefined.`);
}

namespace Environment {
  export function has(name: string): boolean {
    const value: undefined | string = process.env[name];

    return value !== undefined && value.length > 0;
  }
  export function hasNot(name: string): boolean {
    return !has(name);
  }

  export function string(name: string, defaultValue?: string): string {
    const value: undefined | string = process.env[name];

    if (value === undefined) {
      return check(name, defaultValue);
    }

    return value;
  }
  export function stringEqual(name: string, value: string): boolean {
    return string(name) === value;
  }
  export function stringNotEqual(name: string, value: string): boolean {
    return !stringEqual(name, value);
  }

  export function boolean(name: string, defaultValue?: boolean): boolean {
    const value: undefined | string = process.env[name];

    if (value === undefined) {
      return check(name, defaultValue);
    }

    if (value !== 'true' && value !== 'false') {
      throw new Error(`Environment variable '${name}' is not valid.`);
    }

    return value === 'true';
  }
  export function booleanEqual(name: string, value: boolean): boolean {
    return boolean(name) === value;
  }
  export function booleanNotEqual(name: string, value: boolean): boolean {
    return !booleanEqual(name, value);
  }

  export function integer(name: string, defaultValue?: number): number {
    const value: undefined | string = process.env[name];

    if (value === undefined) {
      return check(name, defaultValue);
    }

    const parsed: number = Number.parseInt(value, 10);

    if (!Number.isInteger(parsed)) {
      throw new Error(`Environment variable '${name}' is not valid.`);
    }

    return parsed;
  }
  export function integerEqual(name: string, value: number): boolean {
    return integer(name) === value;
  }
  export function integerNotEqual(name: string, value: number): boolean {
    return !integerEqual(name, value);
  }
}

Object.defineProperty(global, 'environment', {
  value: Environment,
});

declare global {
  const environment: typeof Environment;
}
