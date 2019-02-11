var testCases = [
    {input: {siteLang:'de', userReg: {registration:'20180101000000'}, userEditCount: 300, userGroups: ["Prüfer", 'autoreview'], userName:'Testerson' },
     expectedOutput: true},

    {input: {siteLang:'de', userReg: {registration:'20180101000000'}, userEditCount: 300, userGroups: ["Prüfer"], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'de', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["Prüfer", 'autoreview'], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'de', userReg: {registration:'20200101000000'}, userEditCount: 200, userGroups: ["Prüfer", 'autoreview'], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'pl', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["autoconfirmed"], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'pl', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["editor"], userName:'Testerson' },
     expectedOutput: true},

    {input: {siteLang:'ar', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["autoconfirmed"], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'ar', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["autoreview"], userName:'Testerson' },
     expectedOutput: true},

    {input: {siteLang:'fa', userReg: {registration:'20190101000000'}, userEditCount: 500, userGroups: ["autoconfirmed"], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'fa', userReg: {registration:'20180101000000'}, userEditCount: 200, userGroups: ["autoconfirmed"], userName:'Testerson' },
     expectedOutput: false},

    {input: {siteLang:'fa', userReg: {registration:'20180101000000'}, userEditCount: 500, userGroups: ["autoreview"], userName:'Testerson' },
     expectedOutput: true}
]


for (let testCase of testCases){
    var input = testCase.input
    var actual = decideShow(input.siteLang, input.userReg, input.userEditCount, input.userGroups, input.userName)
    var expected = testCase.expectedOutput
    if (actual===expected){
        console.log('Test Passed')
    }
    else if (actual !== expected){
        console.log('Test failed')
        console.log("Actual: ", actual, " Expected: ", expected)
        console.log('Input: ', input)
    }
}
