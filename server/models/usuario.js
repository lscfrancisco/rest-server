
const mongoose =  require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema  = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario ']
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria ']
    },
    img: { 
        type: String,
    },
    role: { 
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
     },
    google: { 
        type: Boolean,
        default: false
    }
});

//remover el campo contraseña al enviar la respuesta de que el usuario
//se creo correctamente
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}

usuarioSchema.plugin( uniqueValidator, { message: 'El {PATH} ya existe' })

module.exports = mongoose.model( 'Usuario', usuarioSchema );
