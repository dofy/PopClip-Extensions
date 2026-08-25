/**
 * DOCS: https://www.popclip.app/dev/snippets
 */

// #popclip
// name:
//   en: JavaScript Snippet Template
//   zh-hans: JavaScript Snippet 模板
//   zh-hant: JavaScript Snippet 範本
//   ja: JavaScript snippetのテンプレート
//   ko: JavaScript 스니펫 템플릿
//   fr: Modèle de snippet JavaScript
//   es: Plantilla de snippet JavaScript
// description:
//   en: A starter PopClip snippet with three example actions.
//   zh-hans: 包含三个示例动作的 PopClip snippet 入门模板。
//   zh-hant: 包含三個範例動作的 PopClip snippet 入門範本。
//   ja: 3つのサンプルアクションを備えたPopClip snippetのスターターテンプレートです。
//   ko: 세 가지 예제 동작이 포함된 PopClip 스니펫 시작 템플릿입니다.
//   fr: Modèle de départ PopClip avec trois actions d’exemple.
//   es: Plantilla inicial de PopClip con tres acciones de ejemplo.
// keywords: template example
// language: javascript
// module: true
module.exports = {
  icon: "iconify:ion:fish",
  actions: [
    {
      icon: "circle filled 1",
      after: "show-result",
      title: {
        en: "Action 1",
        "zh-hans": "动作 1",
        "zh-hant": "動作 1",
        ja: "アクション 1",
        ko: "동작 1",
        fr: "Action 1",
        es: "Acción 1",
      },
      code: (input) => {
        return "Hi from the action. Your text is: " + input.text;
      },
    },
    {
      icon: "circle filled 2",
      after: "paste-result",
      title: {
        en: "Action 2",
        "zh-hans": "动作 2",
        "zh-hant": "動作 2",
        ja: "アクション 2",
        ko: "동작 2",
        fr: "Action 2",
        es: "Acción 2",
      },
      code: (input) => "Action 2: " + input.text,
    },
    {
      icon: "circle filled 3",
      title: {
        en: "Action 3",
        "zh-hans": "动作 3",
        "zh-hant": "動作 3",
        ja: "アクション 3",
        ko: "동작 3",
        fr: "Action 3",
        es: "Acción 3",
      },
      code() {
        popclip.showText("Action 3 ...");
      },
    },
  ],
};
