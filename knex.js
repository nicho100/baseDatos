const knex= require("knex")
const dbMaria= knex({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        database:"ecommerce",
    },
})
const dbSqlite=knex({
    client:"sqlite3",
    connection:{
        filename:"./baseDatos/DB/ecommerce.sql"
    },
    useNullAsDefault:true,
})

module.exports={dbMaria,dbSqlite}