export const isFunction = (val: any): boolean => typeof val === "function";
export const isArray = (val: any): boolean => val && Array.isArray(val) || false;
export const isObject = (val: any): boolean => val && typeof val === "object" && !Array.isArray(val) || false;