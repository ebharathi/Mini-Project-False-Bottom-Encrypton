import axios from "axios";
let r = [282, 100, 126, 377, 121];
let cipher=[5552, 5739, 5911, 7536, 5392, 5571, 4340, 5212, 4300, 7150, 2613, 4027, 1521, 6773, 1924, 4488, 5878, 898, 4283, 2951, 6656, 1502, 5325, 6363, 3714, 7198, 1635, 2746, 6084, 5145, 5859, 4438, 2984, 2562, 5775]
let Accname = {'Abi': 5, 'Eb': 11, 'god': 17, 'john': 23, 'fin': 29};
let key_pair={'5': {'0': 1, '2': 5, '3': 0}, '6': {'1': 4, '2': 6, '3': 3}, '7': {'1': 7, '2': 0, '3': 2}, '8': {'0': 3, '1': 0, '3': 8}, '9': {'0': 9, '2': 1, '3': 6}, '10': {'0': 10, '1': 4, '3': 5}, '11': {'1': 8, '2': 0, '3': 11}, '12': {'0': 12, '2': 1, '3': 10}, '13': {'0': 5, '1': 13, '2': 6}, '14': {'0': 0, '1': 14, '2': 12}, '15': {'0': 6, '1': 15, '2': 4}, '16': {'0': 2, '1': 16, '2': 12}, '17': {'0': 15, '1': 17, '3': 12}, '18': {'0': 18, '2': 6, '3': 4}, '19': {'0': 19, '1': 14, '3': 9}, '20': {'0': 9, '1': 6, '2': 20}, '21': {'0': 7, '2': 21, '3': 1}, '22': {'0': 22, '1': 18, '2': 19}, '23': {'0': 9, '2': 6, '3': 23}, '24': {'0': 24, '2': 10, '3': 15}, '25': {'0': 25, '1': 20, '2': 6}, '26': {'0': 2, '2': 26, '3': 14}, '27': {'0': 6, '2': 13, '3': 27}, '28': {'0': 17, '1': 28, '3': 7}, '29': {'1': 21, '2': 29, '3': 17}, '30': {'0': 30, '2': 2, '3': 22}, '31': {'1': 31, '2': 13, '3': 9}, '32': {'1': 3, '2': 32, '3': 26}, '33': {'0': 33, '1': 3, '2': 15}, '34': {'0': 34, '1': 27, '3': 7}}
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
function encryptop(x, y, n) {
    let dict = {};
    for (let i = 0; i < 2; i++) {
        dict[y[i]] = x[i];
    }
    
    let a = [];
    let b = [];
    console.log("dict-->",dict)
    for (let i in dict) {
        console.log("a-i-->",i)
        a.push(r[i]);
    }
    
    for (let i in dict) {
        console.log("b-i-->",dict[i])
        b.push(cipher[dict[i]]);
    }

    a.push(r[y[2]]);
    console.log("A-->",a,"B-->",b)
    let t = [b[0] + a[0], b[1] + a[1]];
    console.log("t---->",t);
    let s = t[0] ^ t[1];
    console.log("s---->",s);
    let new_cipher = n ^ s;
    new_cipher = Math.round(new_cipher - a[2]);
    console.log("new cipher-->",new_cipher)
    return new_cipher;
}
async function send(n, msg)
{
    let options = {
        method: "POST",
        url: "http://localhost:8000/user/creditcard",
        data: {
            name: n,
            message:msg
        }
    }
    let result;
    await axios(options)
        .then((resp) => {
            console.log("response for transacton--->", resp)
            if (resp.data.error == "false")
                result={error:"false"}
            else
                result={error:"true"}
        })
    return result;
}
async function calculation2(name, values) {
    await getDatabase();
    let message = [];
    let index = Accname[name];
    for (let i = index; i < index + 6;++i) {
        let dict = key_pair[i];
        let x = []
        let y=[]
        let entries = Object.entries(dict);
        let temp;
        for (let [key, v] of entries) {
            if (v != i) {
                y.push(key);
                x.push(v);
            }
            else
                temp = key;
                 
        }
        y.push(temp);
        console.log("x--->", x)
        console.log("Y---->",y)
        console.log("I----->",i)
        message.push(encryptop(x, y, values[i-index]));
        console.log("message--->",message)
    }
    let resp = await send(name, message)
    console.log("rrr->",resp)
    return resp;
    // console.log("DB UPDATED")
    // console.log("KEY VALUE PAIR:");
    // console.log(key_pair);
    // console.log("UPDATED ACCOUNTS:");
    // console.log(Accname);
}
export default calculation2