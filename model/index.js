
const{dbMaria,dbSqlite}=require("../knex")
const createTable=async()=>{
    try{
        await dbMaria.schema.dropTableIfExists("productos")
        await dbMaria.shema.createTable("productos",(table)=>{
            table.increments("id")
            table.string("name",15).notNullable()
            table.float("price").notNullable()
            table.string("thumbnail",40).notNullable()
        })
        await dbSqlite.schema.dropTableIfExists("mensajes")
        await dbSqlite.schema.createTable("mensajes",(table)=>{
            table.increments("id")
            table.string("email",50).notNullable()
            table.date("date").notNullable()
            table.string("message",40).notNullable()
        })
    } catch(err){
        console.log(err.message)
    }
} 

module.exports={createTable}