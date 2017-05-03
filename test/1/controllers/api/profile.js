/*
 * atlas
 * https://github.com/marcus-sa/express-atlas
 *
 * Copyright (c) 2016 Marcus S. Abildskov
 * Licensed under the MIT license.
 */


export default {
  method: 'get',
  params: ':user',

  action: function (req, res) {
    res.send(`Profile: ${req.params.user}`)
  }
}
