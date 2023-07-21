module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'users', // table name
                'isValid', // new field name
                {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: true,
                },
            )
        ]);
    },

    down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn('users', 'isValid')
        ]);
    },
};
