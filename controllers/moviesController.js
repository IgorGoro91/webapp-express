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

export{index, show, destroy}