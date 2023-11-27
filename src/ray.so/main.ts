/// <reference path="/Applications/PopClip.app/Contents/Resources/popclip.d.ts" />

const extension: Extension = {
  actions: [
    {
      title: 'Generate "Ray.so" image',
      code({ text }, { theme, darkMode, background, padding }, context) {
        popclip.openUrl(
          `https://ray.so/#code=${util.base64Encode(text, {
            urlSafe: true,
          })}&theme=${theme}&darkMode=${darkMode}&background=${background}&padding=${padding}`
        );
      },
    },
  ],
};
export default extension;
