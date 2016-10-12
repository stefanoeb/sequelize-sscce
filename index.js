var Sequelize = require('sequelize'),
    Q = require('q');

var sequelize = new Sequelize('sequelize_test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var Author = sequelize.define('Author', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    tableName: 'author'
});
var Book = sequelize.define('Book', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    tableName: 'book'
});

//1:n relation between them
Author.hasMany(Book, {
    foreignKey: {
        name: 'author_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// sequelize.sync({force: true});

Author.findAndCountAll({
    include: [
        {
            model: Book,
            required: true,
            where: ['Books.name like ?', '%bar%']
        }
    ],
    offset: 0,
    limit: 20
})
    .then(function (ret) {
        console.log(ret);
    })
    .catch(function (error) {
        console.log(error);
    });



