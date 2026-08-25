/**
 * DOCS: https://www.popclip.app/dev/snippets
 */

// #popclip
// name:
//   en: TypeScript Snippet Template
//   zh-hans: TypeScript Snippet 模板
//   zh-hant: TypeScript Snippet 範本
//   ja: TypeScript snippetのテンプレート
//   ko: TypeScript 스니펫 템플릿
//   fr: Modèle de snippet TypeScript
//   es: Plantilla de snippet TypeScript
// description:
//   en: A starter PopClip snippet with two example actions.
//   zh-hans: 包含两个示例动作的 PopClip snippet 入门模板。
//   zh-hant: 包含兩個範例動作的 PopClip snippet 入門範本。
//   ja: 2つのサンプルアクションを備えたPopClip snippetのスターターテンプレートです。
//   ko: 두 가지 예제 동작이 포함된 PopClip 스니펫 시작 템플릿입니다.
//   fr: Modèle de départ PopClip avec deux actions d’exemple.
//   es: Plantilla inicial de PopClip con dos acciones de ejemplo.
// keywords: template example
// language: typescript
// module: true
const extension: Extension = {
  icon: 'iconify:ion:fish',
  requirements: ['text'],
  options: [
    {
      identifier: 'option1',
      label: {
        en: 'Option 1',
        'zh-hans': '选项 1',
        'zh-hant': '選項 1',
        ja: 'オプション 1',
        ko: '옵션 1',
        fr: 'Option 1',
        es: 'Opción 1',
      },
      type: 'boolean',
    },
  ],
  actions: [
    {
      title: {
        en: 'Action 1',
        'zh-hans': '动作 1',
        'zh-hant': '動作 1',
        ja: 'アクション 1',
        ko: '동작 1',
        fr: 'Action 1',
        es: 'Acción 1',
      },
      icon: 'circle filled 1',
      after: 'show-result',
      code: (input) => {
        return 'Hi from the action. Your text is: ' + input.text
      },
    },
    {
      title: {
        en: 'Action 2',
        'zh-hans': '动作 2',
        'zh-hant': '動作 2',
        ja: 'アクション 2',
        ko: '동작 2',
        fr: 'Action 2',
        es: 'Acción 2',
      },
      icon: 'circle filled 2',
      after: 'show-result',
      code: (input, { option1 }) => {
        popclip.openUrl(
          `https://www.google.com/search?q=${encodeURIComponent(input.text)}`
        )
        return `Option 1 is ${option1 ? 'enabled' : 'disabled'}`
      },
    },
  ],
}
export default extension
