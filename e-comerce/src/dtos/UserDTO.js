class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        // otros campos necesarios
    }
}

module.exports = UserDTO;
