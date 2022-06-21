'use strict';

//encode username and password

const base64 = require('base-64');
const bcrypt = require('bcrypt')

const username = 'Tahany';
const password = '12345';

const encoded = base64.encode(`${username}:${password}`);

console.log(`Basic ${encoded}`); //Basic VGFoYW55OjEyMzQ1

const decoded = base64.decode(encoded);

console.log(`decoded ${decoded}`);//decoded Tahany:12345

//Hashing Encryption => security

const password2 = 'test12345';

encrypt(password2);

async function encrypt(text){
    console.log('Before hashing =>' , text);

    let hashed = await bcrypt.hash(text, 5);

    console.log('After hashing =>', hashed);

    let valid = await bcrypt.compare(text, hashed);

    console.log('Valid =>', valid);
}