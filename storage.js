class Storage{
    #users = new Map();

    getById(id) {
        if(!this.#users.has(id)) return null;
        return this.#users.get(parseInt(id));
    }

    getAll(){
        //посмотреть деструктаризацию
        return Array.from(this.#users.values());
    }

    add(user) {
        let id = 0;
        // Math.max
        for (let number of this.#users.keys()) {
            if(id < number);
            id = number
        }
        id +=1;
        user.id = id;
        this.#users.set(id, user);
        return user;
    }

    updateById(id, user) {
        if(!this.#users.has(id)) return null;
        let entity = this.getById(id);
        Object.assign(entity, user);
        entity.id = id;
        return entity;
    }

    deleteById(id) {
        return this.#users.delete(id);
    }
}

module.exports = Storage