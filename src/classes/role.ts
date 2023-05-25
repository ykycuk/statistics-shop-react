export class Role {
    id: number;
    name: string;
    permissions: Permissions[];

    constructor(id = 0, name = '', permissions = []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}