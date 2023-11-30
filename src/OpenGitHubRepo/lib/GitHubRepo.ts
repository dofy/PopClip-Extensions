/// <reference path="/Applications/PopClip.app/Contents/Resources/popclip.d.ts" />

const GITHUB_DOMAIN = "https://github.com";

const extension: Extension = {
  actions: ({ text }, { username }) => {
    const [user, repo] = text.replace(/\s+/g, "").split("/");

    const actions: Action[] = [
      {
        title: {
          en: `Open Repo: ${user}/${repo}`,
          ja: `リポジトリを開く: ${user}/${repo}`,
          "zh-Hans": `打开仓库: ${user}/${repo}`,
          "zh-Hant": `打開倉庫: ${user}/${repo}`,
        },
        icon: "assets/github.svg",
        code() {
          popclip.openUrl(`${GITHUB_DOMAIN}/${user}/${repo}`);
        },
      },
    ];
    username &&
      user !== username &&
      actions.push({
        title: {
          en: `Open My Repo: ${username}/${repo}`,
          ja: `自分のリポジトリを開く: ${username}/${repo}`,
          "zh-Hans": `打开我的仓库: ${username}/${repo}`,
          "zh-Hant": `打開我的倉庫: ${username}/${repo}`,
        },
        icon: "assets/my-github.svg",
        code() {
          popclip.openUrl(`${GITHUB_DOMAIN}/${username}/${repo}`);
        },
      });
    return actions;
  },
};

export default extension;
