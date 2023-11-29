/// <reference path="/Applications/PopClip.app/Contents/Resources/popclip.d.ts" />

const optionsToParams = (options: {
  [key: string]: string | boolean;
}): string => {
  const params = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return params;
};

const extension: Extension = {
  actions: [
    {
      title: 'Generate "Ray.so" image',
      code({ text }, options) {
        const code = util.base64Encode(text, { urlSafe: true });
        const params = optionsToParams(options);
        popclip.openUrl(`https://ray.so/#code=${code}&${params}`);
      },
    },
  ],
};
export default extension;
