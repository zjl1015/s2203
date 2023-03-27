module.exports = {
  packagerConfig: {
     icon: '/images/icon' // no file extension required
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
         // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
         iconUrl: 'http://gitee.com/zhujinlong/s2203/raw/main/electron/day01/images/icon.ico',
         // The ICO file to use as the icon for the generated Setup.exe
         setupIcon: '/images/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: '/images/icon.png'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
