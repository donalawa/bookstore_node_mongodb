exports.get404 =  (req,res,next) => {
    // res.status(404).sendFile(path.join(roodDir,'views','404.html'))
    // res.render('404',{pageTitle:'404'})
    res.status(404).render('404',{pageTitle: 'Page Not Found',path: '/error'})
}