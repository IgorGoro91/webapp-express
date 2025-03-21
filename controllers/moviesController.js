import connection from "../data/db.js";




function index(req, res){
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results)=>{
        if(err) return req.status(500).json({
            error: 'Errore lato server INDEX funzion'
        })
        
        res.json(results)
    })

}



function show(req, res){
    const{id} =req.params;

    const movieSql = 'SELECT * FROM movies WHERE id = ?'

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?'

    connection.query(movieSql, [id], (err, results) =>{
        if(err) return req.status(500).json({
            error: 'Errore lato server SHOW funzion'
        })

        if(results.length === 0) return res.status(404).json({
            error: 'Movies non found'
        })

        const movie = results[0]

        connection.query(reviewsSql,[id], (err, reviewsResults) =>{
            if(err) return req.status(500).json({
                error: 'Errore lato server SHOW funzion'
            })

            movie.reviews = reviewsResults
            res.json(movie)

        })
    })

}



function update(req, res) {
    const {id} = req.params
    const {image} =req.body

    const sql = 'UPDATE movies SET image = ? WHERE id = ?'

    connection.query(sql, [image,id], (err) =>{
        if(err) return req.status(500).json({
            error: 'Errore lato server DESTROY funzion'
        })
        res.json({ message: "Movies update succes"})
})

}




function destroy(req, res){

    const{id} =req.params; 

    const sql = 'DELETE FROM movies WHERE id = ?'

    connection.query(sql ,[id], (err) =>{
        if(err) return req.status(500).json({
            error: 'Errore lato server DESTROY funzion'
        })

       

        res.sendStatus( 204)

    })

}


function storeRewiew(req, res){
    const {id} = req.params

    const {text, name, vote} = req.body

    const sql = 'INSERT INTO reviews (text , name, vote, movie_id) VALUES (?,?,?,?)'

    connection.query(sql, [text, name, vote, id],(err, results)=>{
        if(err) return res.status(500).json({
            error: 'Database Error StoreReview'
        })

        res.status(201)
        res.json({
            message: 'review Added',
            id: results.insertId
        })
    })

}


function store(req,res){
    //recuparare le info da req.body
    const { title, director, abstract} = req.body

    const imageName = `${req.file.filename}`

    const sql = "INSERT INTO movies (title, director, image, abstract) VALUES (?,?,?,?)"

    connection.query( sql, [title, director, imageName, abstract], (err, results) => {
        if(err) return res.status(500).json({
            error: 'Database Errore Store'
        })

        res.status(201).json({
            status: "success",
            message: "Movies creato con successo",
            id: results.insertId
        }
        )
    })

}

export{index, show, destroy, update, storeRewiew, store}