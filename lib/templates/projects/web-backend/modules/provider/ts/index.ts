export /*bundle*/
class Provider {
    users = new Map([
        [1, {id: 1, name: 'Emiliano', lastname: 'Martínez'}],
        [2, {id: 2, name: 'Gonzalo', lastname: 'Montiel'}],
        [3, {id: 3, name: 'Nicolás', lastname: 'Otamendi'}],
        [4, {id: 4, name: 'Cristian', lastname: 'Romero'}],
        [5, {id: 5, name: 'Marcos', lastname: 'Acuña'}],
        [6, {id: 6, name: 'Leandro', lastname: 'Paredes'}],
        [7, {id: 7, name: 'Rodrigo', lastname: 'de Paul'}],
        [8, {id: 8, name: 'Giovani', lastname: 'Lo Celso'}],
        [9, {id: 9, name: 'Lautaro', lastname: 'Martínez'}],
        [10, {id: 10, name: 'Lionel', lastname: 'Messi'}],
        [11, {id: 11, name: 'Ángel', lastname: 'Di María'}]
    ]);

    get(id) {
        return !this.users.has(id) ? 'User not exist' : this.users.get(id);
    }

    list() {
        const entries = [];
        this.users.forEach(user => entries.push(user));
        return entries;
    }
}