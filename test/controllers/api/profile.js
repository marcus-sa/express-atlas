export default {
  method: 'get',
  params: ':user',

  action: function (req, res) {
    res.send(`Profile: ${req.params.user}`)
  }
}
