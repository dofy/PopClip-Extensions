/**
 * DOCS: https://www.popclip.app/dev/snippets
 */

// #popclip
// name: Name
// language: javascript
// module: true
module.exports = {
  icon: "square " + String(Math.floor(Math.random() * 100)),
  actions: [
    {
      icon: "A1",
      after: "show-result",
      title: "Action 1",
      code: (input) => {
        return "Hi from the action. Your text is: " + input.text;
      },
    },
    {
      icon: "A2",
      after: "paste-result",
      title: "Action 2",
      code: () => "Action 2 ...",
    },
    {
      icon: "A3",
      title: "Action 3",
      code() {
        popclip.showText("Action 3 ...");
      },
    },
  ],
};
