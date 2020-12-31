module.exports = words => {
    return new Promise((resolver, reject)=>{
        try{
            const groupedWords = words.reduce((obj, word) =>{
                if(obj[word]){
                    obj[word] += 1;
                }else{
                    obj[word] = 1;
                }
                return obj;
            }, {});
            const groupedWordsArrays = Object.keys(groupedWords)
                .map(key => ({ name:key, amount: groupedWords[key]}))
                .sort((w1, w2) => w2.amount - w1.amount)
            ;

            resolver(groupedWordsArrays);
        }catch(err){
            reject(err);
        }
    })
}