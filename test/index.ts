const inquirer = require("inquirer");
abstract class IIndex{

}

class Index extends IIndex{
    private static Instance:Index;
    private constructor(){super()}
    public static getInstance(){
        if( !Index.Instance ){
            Index.Instance = new Index()
        }
        return Index.Instance
    }

    test(){
        return [1,2,3]
    }
}

;(async()=>{
    const index = Index.getInstance()
    const prompt = await inquirer.prompt([
        {
          name: "param",
          message: `测试输入？`,
          type: "input",
        },
    ]);
    console.log( prompt.param )
    console.log( index.test() )
})();

export {

}