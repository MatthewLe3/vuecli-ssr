import createApp from "./main";

const {app,router,store} = createApp()

// window.__INITIA_STATE__ 服务端保存的数据，再客户端挂载前替换到store中，无需重复获取
if(window.__INITIA_STATE__){
    store.replaceState(window.__INITIAL_STATE__);
}

// onReady避免部分路由通过懒加载引入
router.onReady(()=>{
    // beforeReslove 确保所有异步组件都resolve
    router.beforeResolve((to,from,next)=>{
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false

        // 判断当前路由是否已经进行过预处理

        const activated = matched.filter((c,i)=>{
            return diffed || (diffed = prevMatched[i] != c);
        })

        if(!activated.lenth){
            return next()
        }

        Promise.all(
            activated.map(c=>{
                if(c.asyncData){
                    return c.asyncData({store,route:to})
                }
            })
        ).then(()=>{
            next()
        }).catch(next())
    })

    app.$mount('#app')
})