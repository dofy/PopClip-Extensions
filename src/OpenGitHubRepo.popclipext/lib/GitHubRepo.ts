const GITHUB_DOMAIN = 'https://github.com'
const NPM_DOMAIN = 'https://www.npmjs.com'
const GITHUB_URL_PATTERN = /https?:\/\/(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+)/i
const GITHUB_REPO_PATTERN = /[\w.-]+\s*\/\s*[\w.-]+/
const NPM_PACKAGE_PATTERN =
  /(@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*)(?:(?:\s+|@)v?(\d+\.\d+\.\d+(?:-[0-9a-z.-]+)?))?/i

const extension: Extension = {
  actions: ({ text }, { username }) => {
    const npmPackageMatch = text.match(NPM_PACKAGE_PATTERN)
    const githubUrlMatch = text.match(GITHUB_URL_PATTERN)
    const githubRepoMatch = githubUrlMatch ? null : text.match(GITHUB_REPO_PATTERN)
    if (!githubUrlMatch && !githubRepoMatch) return []

    const [user, rawRepo] = githubUrlMatch
      ? [githubUrlMatch[1], githubUrlMatch[2]]
      : githubRepoMatch![0].replace(/\s+/g, '').split('/')
    const repo = rawRepo.replace(/\.git$/i, '')

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

    if (npmPackageMatch) {
      const [, packageName, version] = npmPackageMatch
      const packageLabel = `${packageName}${version ? `@${version}` : ''}`
      const versionPath = version ? `/v/${encodeURIComponent(version)}` : ''

      actions.push({
        title: {
          en: `Open npm Package: ${packageLabel}`,
          ja: `npmパッケージを開く: ${packageLabel}`,
          'zh-hans': `打开 npm 包: ${packageLabel}`,
          'zh-hant': `打開 npm 套件: ${packageLabel}`,
          ko: `npm 패키지 열기: ${packageLabel}`,
          fr: `Ouvrir le paquet npm : ${packageLabel}`,
          es: `Abrir paquete npm: ${packageLabel}`,
        },
        icon: 'square filled NPM',
        code() {
          popclip.openUrl(
            `${NPM_DOMAIN}/package/${encodeURIComponent(packageName)}${versionPath}`,
          )
        },
      })
    }

    return actions
  },
}

export default extension
