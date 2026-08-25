const GITHUB_DOMAIN = 'https://github.com'

const extension: Extension = {
  actions: ({ text }, { username }) => {
    const [user, repo] = text.replace(/\s+/g, '').split('/')

    const actions: Action[] = [
      {
        title: {
          en: `Open Repo: ${user}/${repo}`,
          ja: `リポジトリを開く: ${user}/${repo}`,
          'zh-hans': `打开仓库: ${user}/${repo}`,
          'zh-hant': `打開倉庫: ${user}/${repo}`,
          ko: `저장소 열기: ${user}/${repo}`,
          fr: `Ouvrir le dépôt : ${user}/${repo}`,
          es: `Abrir repositorio: ${user}/${repo}`,
        },
        icon: 'assets/github.svg',
        code() {
          popclip.openUrl(`${GITHUB_DOMAIN}/${user}/${repo}`)
        },
      },
    ]
    username &&
      user !== username &&
      actions.push({
        title: {
          en: `Open My Repo: ${username}/${repo}`,
          ja: `自分のリポジトリを開く: ${username}/${repo}`,
          'zh-hans': `打开我的仓库: ${username}/${repo}`,
          'zh-hant': `打開我的倉庫: ${username}/${repo}`,
          ko: `내 저장소 열기: ${username}/${repo}`,
          fr: `Ouvrir mon dépôt : ${username}/${repo}`,
          es: `Abrir mi repositorio: ${username}/${repo}`,
        },
        icon: 'assets/my-github.svg',
        code() {
          popclip.openUrl(`${GITHUB_DOMAIN}/${username}/${repo}`)
        },
      })
    return actions
  },
}

export default extension
