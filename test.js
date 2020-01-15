const NewsListModel = require('./model')

const saveNewsList = async (data = []) => {
    try {
        console.log('保存')
        const newsList = new NewsListModel({
            list: data
        })
        await newsList.save()
        console.log('保存成功')
    } catch (error) {
        console.log('保存失败')
        console.log(error)
    }
}

saveNewsList([
    {
        title: 'test',
        src: 'test',
        source: 'test'
    }
])