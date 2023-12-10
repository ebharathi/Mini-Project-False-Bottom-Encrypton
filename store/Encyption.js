import axios from "axios";
let r = [385, 206, 369, 369, 424];
let cipher = [5552, 5739, 5911, 7536, 5392, 5571, 4340, 5212, 4300, 7150, 2613, 4027, 1521, 6773, 1924, 4488, 5878];
let Accname = {'Abi': 5, 'Eb': 11};
let key_pair = {5: {3: 0, 0: 1, 2: 5}, 6: {3: 3, 1: 4, 2: 6}, 7: {3: 2, 2: 0, 1: 7}, 8: {1: 0, 0: 3, 3: 8}, 9: {3: 6, 2: 1, 0: 9}, 10: {1: 4, 3: 5, 0: 10}, 11: {1: 8, 2: 0, 3: 11}, 12: {2: 1, 3: 10, 0: 12}, 13: {0: 5, 2: 6, 1: 13}, 14: {2: 12, 0: 0, 1: 14}, 15: {0: 6, 2: 4, 1: 15}, 16: {2: 12, 0: 2, 1: 16}};
async function getDatabase()
{
    let options = {
        method: "GET",
        url: "http://localhost:8000/admin/db",
    }
    await axios(options)
        .then((response) => {
            console.log("RESPONSE FOR DATABASE--->", response)
            if (response.data)
            {
                cipher = response.data.cipher
                Accname = response.data.Accname
                key_pair = response.data.key_pair
                console.log("UPDATED DATABASE<-->FETCHED")
                return;
            }
    })
}
async function updateDB()
{
    let options = {
        method: "POST",
        url: "http://localhost:8000/admin/db/update",
        data: {
            cipher: cipher,
            Accname: Accname,
            key_pair:key_pair
        }
    }
    await axios(options)
        .then((response) => {
            if (response.data)
            {
                if (response.data.error == "false")
                {
                    console.log("DB UPDATED[+]")
                    return;
                    }
            }
    })
}
function encryptop(x, y, n, pos) {
    let dict = {};
    for (let i = 0; i < 2; i++) {
        dict[y[i]] = x[i];
    }

    let a = [];
    let b = [];
    for (let i in dict) {
        a.push(r[i]);
        
    }

    for (let i in dict) {
        b.push(cipher[dict[i]]);
    }

    a.push(r[y[2]]);
    console.log("a->",a,"--b->",b)
    let t = [b[0] + a[0], b[1] + a[1]];
    console.log("T-->",t)
    let s = t[0] ^ t[1];
    console.log("S--->",s)
    let new_cipher = n ^ s;
    new_cipher = Math.round(new_cipher - a[2]);

    dict[y[2]] = pos;

    if (pos < cipher.length) {
        cipher[pos] = new_cipher;
    } else {
        cipher.push(new_cipher);
    }

    key_pair[pos] = dict;
}

function calculation(n, pos) {
    let x = [];
    while (x.length < 2) {
        let randomNum = Math.floor(Math.random() * (pos - 1));
        if (!x.includes(randomNum)) {
            x.push(randomNum);
        }
    }

    let y = [];
    while (y.length < 3) {
        let randomNum = Math.floor(Math.random() * (r.length - 1));
        if (!y.includes(randomNum)) {
            y.push(randomNum);
        }
    }

    encryptop(x, y, n, pos);
}

async function calculation2(name, values) {
    await getDatabase();
    let counter = Object.keys(Accname).length === 0 ? 0 : Object.keys(Accname).length;
    Accname[name] = 5 + counter * 6;
    counter++;

    for (let i of values) {
        calculation(parseInt(i), cipher.length);
    }
    console.log("SENDING REQUEST TO UPDATE DB:")
    await updateDB();
    return;
    // console.log("DB UPDATED")
    // console.log("KEY VALUE PAIR:");
    // console.log(key_pair);
    // console.log("UPDATED ACCOUNTS:");
    // console.log(Accname);
}

// Example usage
// calculation2("exampleName", [5678,5678,5678,5678,1230,2407]);
export default calculation2;
