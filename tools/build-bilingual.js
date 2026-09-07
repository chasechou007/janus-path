'use strict'

const { spawnSync } = require('child_process')

const hexoCli = require.resolve('hexo-cli/bin/hexo')

function runHexo (args) {
  const result = spawnSync(process.execPath, [hexoCli, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: 'inherit'
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

const builds = [
  {
    name: 'Simplified Chinese',
    config: '_config.yml,_config.zh-CN.yml'
  },
  {
    name: 'English',
    config: '_config.yml,_config.en.yml'
  }
]

async function main () {
  for (const build of builds) {
    process.stdout.write(`\nBuilding ${build.name} site...\n`)
    runHexo(['clean', '--config', build.config])
    runHexo(['generate', '--config', build.config])
  }

  require('./merge-sitemaps')()
  const report = await require('./optimize-images').optimizeImages()
  console.log('Image optimization:', report)
  require('./verify-bilingual-build')()

  process.stdout.write('\nBilingual site generated in public/.\n')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
