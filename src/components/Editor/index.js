import { Boot } from '@wangeditor/editor'
import ImageMenu from '@/components/Editor/Custom/index.js'

const MenusList = [
  {
    index: 20,
    key: 'ImageMenu',
    class: ImageMenu
  }
]

const registerMenu = function (editor, toolbarConfig) {
  // 获取到所有菜单键
  const allRegisterMenu = editor.getAllMenuKeys()
  let keys = []
  for (let item of MenusList) {
    if (allRegisterMenu.indexOf(item.key) < 0) {
      const menuObj = {
        key: item.key,
        factory() {
          return new item.class()
        }
      }
      Boot.registerMenu(menuObj)
    }
    keys.push(item.key)
  }
  toolbarConfig.insertKeys = {
    index: MenusList[0].index,
    keys: keys
  }
}

export default registerMenu
