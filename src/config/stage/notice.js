const noticeRouter = {
  route: null,
  name: null,
  title: '公告管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-iconset0103',
  filePath: 'views/notice/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '新增公告',
      type: 'view',
      name: 'noticeAdd',
      route: '/notice/add',
      filePath: 'views/notice/NoticeAdd.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '公告列表',
      type: 'view',
      name: 'noticeList',
      route: '/notice/list',
      filePath: 'views/notice/NoticeList.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default noticeRouter
