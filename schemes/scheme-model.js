const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
    return db("steps")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where("scheme_id", id);
}

function add(scheme) {
    return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}

function update(id, changes) {
    return db("schemes")
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db("schemes")
    .where({ id })
    .del();
}