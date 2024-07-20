const fs = require('fs')

const iconKeys$ = new Promise(res => {
  fs.readdir('./public/icons', (_, files) => {
    res(files.map(file => file.replace('.png', '')))
  })
})

Promise.all([
  iconKeys$
]).then(([iconKeys]) => {
  const configJson = {
    iconKeys
  }
  console.log('Writing config.json ...')
  console.log(configJson)
  fs.writeFileSync('./public/config.json', JSON.stringify(configJson, null, 2))
})
