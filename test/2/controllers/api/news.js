/*
 * atlas
 * https://github.com/marcus-sa/express-atlas
 *
 * Copyright (c) 2016 Marcus S. Abildskov
 * Licensed under the MIT license.
 */


export default {
  method: 'get',
  params: ':title',
  model: 'News',

  action: function (req, res, next, News) {
    News.findOne({title: req.params.title}, (err, data) => {
      if (err) throw err

      if (data) {
        res.send(`Title: ${data}`)
      } else {
        res.send('Nothing found')
      }
    })
  }
}
