module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // https://stackoverflow.com/questions/48502827/vuejs-2-how-to-remove-console-log-from-production-builds
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
