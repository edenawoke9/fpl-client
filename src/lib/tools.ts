export const log = (message?: any, ...optionalParams: any[]) => {
  if (process.env.DEBUG === 'true') {
    message ? console.log(message, ...optionalParams) : console.log(...optionalParams);
  }
};
