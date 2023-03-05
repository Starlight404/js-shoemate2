module.exports ={
    env:{
        brower:true,
        node:true,
        ecmaVersion2020:true
    },
    extends:['airbnb-base'],
    parserOption:{
        sourceType:'module',
        ecmaversion:11,
    },
    rules: {
        'no-console': 0,
    },
};