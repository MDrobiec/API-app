const { ConnectionPool } = require('mysql')
const pools = {}
 
function CreatePool(config) {
    let key = JSON.stringify(config)
 
    if (GetPool(key))
        throw new Error('Pool already exists')
 
    pools[key] = (new ConnectionPool(config)).connect()
    return pools[key]
}
 
function GetPool(name) {
  if (pools[name])
    return pools[name]
  else
    return null
}
 
function GetCreateIfNotExistPool(config)  {
    let key = JSON.stringify(config)
 
    let pool = GetPool(key)
    if(pool)
        return pool
    else
        return CreatePool(config)
}
 
function ClosePool(config) {
    let key = JSON.stringify(config)
 
    if (pools[key]) {
        const pool = pools[key];
        delete pools[key];
        pool.close()
        return true
    }
    return false
}
 
function CloseAllPools() {
    pools.forEach((pool) => {
        pool.close()
    })
    pools = {}
    return true
}
 
module.exports = {
  ClosePool,
  CloseAllPools,
  CreatePool,
  GetPool,
  GetCreateIfNotExistPool
}