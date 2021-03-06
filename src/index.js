/*
 * atlas
 * https://github.com/marcus-sa/express-atlas
 *
 * Copyright (c) 2016 Marcus S. Abildskov
 * Licensed under the MIT license.
 */

import glob from 'glob'
import path from 'path'
import fs from 'fs'

function isType (key, type) {
  return typeof key === type
}

export default class AtlasRouter {

  constructor(options: Object) {
    const {mongoose, express, controllers} = options

    if (!isType(controllers, 'string')) {
      throw new Error('You must include the path to your controllers')
    }

    if (isType(express, 'function')) {
      this.express = express
    } else {
      throw new Error('You must include the express module as an option')
    }

    if (!isType(mongoose, 'undefined')) {
      if (isType(mongoose, 'object')) {
        if (!isType(mongoose[0], 'string')) {
          throw new Error('First argument in options.mongoose must be a string containg a path to your models')
        } else {
          glob.sync(path.join(mongoose[0], '**')).forEach(file => {
            const resolve = path.resolve(file)

            if(!(fs.lstatSync(resolve).isDirectory()) && !(file.includes('/models/schemas/'))) {
              require(resolve)
            }
          })

          this.mongoose = mongoose[1]
        }
      } else {
        throw new Error('Must be an object containing the mongoose module and path to your models')
      }
    }

    this.itinerate(controllers)
  }

  itinerate(controllers) {
    glob.sync(path.join(controllers, '**')).forEach(file => {
      try {
        const resolve = path.resolve(file)

        if(fs.lstatSync(resolve).isDirectory()) {
          return false
        }

        const removeDirFromPath = resolve.replace(controllers, '')
        const convertToRoute = removeDirFromPath.split('\\').join('/')
        var route = convertToRoute.replace('.js', '')

        // Ignore dirs
        /*if(this.ignoreDir(removeDirFromPath, options.ignoreDirs)) {
          return false
        }*/

        if(path.basename(file).includes('index')) {
          route = route.replace('/index', '')
        }

        const Controller = require(file)

        if (isType(Controller.params, 'undefined')) {
          Controller.params = ''
        }

        // If by default you have a page that takes in both a post and get request, you can simply create 2 different routes
        // and with one of them put the '-{method}' at the end before the file extension like so:
        // > root
        //  > controllers
        //   > auth
        //    > login.js
        //    > login-post.js
        if (isType(Controller.method, 'undefined')) {
          const getMethod = route.split('-')[1]
          route = route.replace(`-${getMethod}`, '')
          Controller.method = getMethod
        }

        this.apply(route, Controller)
      } catch(err) {
        throw err
      }
    })
  }

  apply(route, controller) {
    if (isType(controller.model, 'undefined')) {
      const method = new Function('app', 'action', `return app.${controller.method}('${route}/${controller.params}', action)`)

      method(this.express, controller.action)
    } else {
      const method = new Function('app', 'action', 'model', `return app.${controller.method}('${route}/${controller.params}', (req, res, next) => action(req, res, next, model))`)

      method(this.express, controller.action, this.mongoose.model(controller.model))
    }
  }

  /*ignoreDir(path: String, ignore: Array) {
    if (typeof ignore !== 'undefined') {
      console.log(ignore.split('/'))
      console.log(path.split('/'))
    }
  }*/

}
