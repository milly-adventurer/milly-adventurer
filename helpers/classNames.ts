const getClassNames = (classNames: Record<string, string>) => (
  ...args: (string | undefined)[]
) =>
  args
    .map((className) => (classNames[className || '']) || '')
    .join(' ');

export default getClassNames;
