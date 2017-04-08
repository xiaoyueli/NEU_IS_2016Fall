module.exports = {
    list: ["puy","goose","rooster","hen","chick","duck","turkey","horse","pony","mule",
        "donkey","buffalo","cow","pig","sheep","goat","lamb","zebra","deer","giraffe",
        "camel","alpaca","vicuna","elephant","rhinoceros","hippopotamus","cat","grimalkin",
        "tomcat","kitten","kitty","pussy","lion","lynx","panther","puma","leopard","tiger",
        "wildcat","bison","yak","dog","badger","weasel","otter","fox","hyena","wolf","squirrel",
        "dormouse","beaver","ferret","bear","rabbit","hare","rat","chinchilla","gopher","marmot",
        "mole","mouse","vole","monkey","chimpanzee","gorilla","orangutan","sloth","anteater", "duckbill",
        "platypus","kangaroo","koala","hedgehog","porcupine","bat","whale","dolphin","seal","walrus" ],
    getList: getList,
    deleteWord: deleteWord,
    randomPick: randomPick
}


function getList(n) {

    const res = [];

    this.list.forEach(word => {
        if(Math.floor(Math.random() * n) % 4 === 0) {

            if (res.length < n) res.push(word);
        }
    });

    return res;
}

function deleteWord(list, word) {

    let i = 0;
    for (; i < list.length; i++) {
        if (list[i] === word) break;
    }
    if (i < list.length) {
        list.splice(i, 1);
        return list;
    }


    return null;
}

function randomPick(list) {

    const index = Math.floor(Math.random() * list.length);
    return list[index];

}