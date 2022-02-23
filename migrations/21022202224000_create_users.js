module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userName:{
                type: type.STRING(60),
            },
            date:{
                type: type.date
            },
            punchIn:{
                type: type.STRING(60)
            },
            punchOut:{
                type: type.STRING(60)
            }
        });
   },
   down: (queryInterface, Sequelize) => {
       return queryInterface.dropTable('users');
   }
};