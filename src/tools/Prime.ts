abstract class IPrime{

    //挨筛法求质数
    abstract getPrime():Transferable

}

class Prime extends IPrime{

    private static Instance:Prime;
    private constructor(){
        super()
    }
    public static getInstance(){
        if( !Prime.Instance ){
            Prime.Instance = new Prime()
        }
        return Prime.Instance;
    }

    getPrime():Transferable{
        return new TransformStream({
            async transform(chunk, controller){
                const param = JSON.parse( Buffer.from( chunk ).toString() )
                if( !param.num ) throw new Error("缺少必要参数num,且参数必须位正整数")
                const LENGTH = param.num
                const vist = new Int8Array( LENGTH )
                const ans = new Array<number>()
                const dfs = function(id:number){
                    switch(true){
                        case id === LENGTH:
                            return true
                        case id <= 1:
                            vist[id] = 0;
                            return true
                        default:
                            ans.push( id )
                            for( let p = id; p * id < LENGTH; ++p ) vist[p*id] || (vist[p*id] ^= 1) 
                            return true
                    }
                }
                for( let i = 0; i < LENGTH; i++ )  vist[i] || dfs(i)
                return controller.enqueue( Buffer.from( JSON.stringify( ans ) ) )
            }
        })
    }

    getAuth(){
        //@ts-ignore
        console.log( JSON.parse(Buffer.from( "WyJcbiIsIlxuIiwiICAgICAgICAgICAgICAgICAgIF9fXz09PT0tXyAgXy09PT09X19fXG4iLCIgICAgICAgICAgICAgXy0tXl5eIyMjIyMvLyAgICAgIFxcXFwjIyMjI15eXi0tX1xuIiwiICAgICAgICAgIF8tXiMjIyMjIyMjIyMvLyAoICAgICkgXFxcXCMjIyMjIyMjIyNeLV9cbiIsIiAgICAgICAgIC0jIyMjIyMjIyMjIyMvLyAgfFxcXl4vfCAgXFxcXCMjIyMjIyMjIyMjIy1cbiIsIiAgICAgICBfLyMjIyMjIyMjIyMjIy8vICAgKEA6OkApICAgXFxcXCMjIyMjIyMjIyMjI1xcX1xuIiwiICAgICAgLyMjIyMjIyMjIyMjIyMoKCAgICAgXFxcXC8vICAgICApKSMjIyMjIyMjIyMjIyNcXFxuIiwiICAgICAtIyMjIyMjIyMjIyMjIyMjXFxcXCAgICAob28pICAgIC8vIyMjIyMjIyMjIyMjIyMjLVxuIiwiICAgIC0jIyMjIyMjIyMjIyMjIyMjI1xcXFwgIC8gVlYgXFwgIC8vIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgICAtIyMjIyMjIyMjIyMjIyMjIyMjI1xcXFwvICAgICAgXFwvLyMjIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgIF8jL3wjIyMjIyMjIyMjL1xcIyMjIyMjKCAgIC9cXCAgICkjIyMjIyMvXFwjIyMjIyMjIyMjfFxcI19cbiIsIiAgfC8gfCMvXFwjL1xcIy9cXC8gIFxcIy9cXCMjXFwgIHwgIHwgIC8jIy9cXCMvICBcXC9cXCMvXFwjL1xcI3wgXFx8XG4iLCIgIGAgIHwvICBWICBWICBgICAgViAgXFwjXFx8IHwgIHwgfC8jLyAgViAgICcgIFYgIFYgIFxcfCAgJ1xuIiwiICAgICBgICAgYCAgYCAgICAgIGAgICAvIHwgfCAgfCB8IFxcICAgJyAgICAgICcgICcgICAnXG4iLCIgICAgICAgICAgICAgICAgICAgICAgKCAgfCB8ICB8IHwgIClcbiIsIiAgICAgICAgICAgICAgICAgICAgIF9fXFwgfCB8ICB8IHwgL19fXG4iLCIgICAgICAgICAgICAgICAgICAgICh2dnYoVlZWKShWVlYpdnZ2KVxuIiwiXG4iLCIgICAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4iLCJcbiIsIiAgICAgIEF1dGhvciAgICAgICA6IGNoZW5zaGVuZ2RhXG4iLCIgICAgICBFbWFpbCAgICAgICAgOiBzaGVuZ2RhY2hlbjE5OTFAZ21haWwuY29tXG4iLCIgICAgICBEYXRlICAgICAgICAgOiAyMDIzLTAzLTEzIDIxOjE4OjA4XG4iLCIgICAgICBHaXRIdWIgICAgICAgOiBodHRwczovL2dpdGh1Yi5jb20vY2hlbnNoZW5nZGEwL2NhcmRzLmdpdFxuIiwiICAgICAgTGVldENvZGUgICAgIDogaHR0cHM6Ly9sZWV0Y29kZS5jbi91L2NoZW5zaGVuZ2RhL1xuIiwiXG4iXQ==", "base64" ).toString("utf8")).join("") )
    }

    *[Symbol.iterator](){
        yield* Object.getOwnPropertyNames( Prime.prototype ).filter( row => row !== "constructor" )
    }

}

/*
    ;(async()=>{
        const prime = Prime.getInstance()
        prime.getAuth()
    })();
*/

export default Prime;