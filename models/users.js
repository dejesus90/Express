module.exports = (sequalize , type) =>{
    // DEFINICION
    const User = sequalize.define('users' , {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId:{
            type: type.STRING
        },
        userName:{
            type: type.STRING
        },
        date:{
            type: type.DATE
        },
        punchIn:{
            type: type.STRING
        },
        punchOut:{
            type: type.STRING
        }
    }, {
        tableName: "users",
        timestamps : false,
    });
    return User;
}