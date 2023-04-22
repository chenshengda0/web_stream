abstract class IBits{

    //获取number 位
    abstract getBits(n:number, id:number, ans:string):string;

    //反转位
    abstract reverseBit(num:number, id:number, ans:number):number;

    //number 转Hex
    abstract toHex(num:number, id:number, ans:string):string;

    //反转一个0之后1最长的数量
    abstract getReverseMax(num:number, before:number, after:number, max:number):number;
}

class Bits extends IBits{
    private static Instance:Bits;
    private constructor(){super()}
    public static getInstance(){
        if( !Bits.Instance ){
            Bits.Instance = new Bits()
        }
        return Bits.Instance;
    }

    //获取bit
    getBits(n:number, id:number = 0, ans:string = ""):string{
        switch(true){
            case id === 32:
                return ans
            default:
                //获取当前最低位使用n&1即可，每次递归都会将n无符号右移一位
                return this.getBits( n >>> 1, ++id, `${n&1}${ans}` )
        }
    }

    //反转BIT
    reverseBit(num:number, id:number = 0, ans:number = 0):number{
        switch(true){
            case id === 32:
                return ans
            case (num & 1) === 0:
                //当前最低位为0时，递归但不改变结果。无符号右移
                return this.reverseBit( num >>> 1, ++id, ans )
            default:
                //当前最低位为1时，修改结果，反转id则为(31 - id)
                return this.reverseBit( num >>> 1, id + 1, ans | 1 << 31 - id ) 
        }
    }

    //number转16进制
    toHex(num:number, id:number = 0, ans:string = "x0"):string{
        const list = "ABCDEF"
        switch(true){
            case id === 32:
                //字符串转为数组
                const res = ans.split("")
                //交换相邻两个字符，16进制字符串是4位转换为一个字符，原字符串刚好是每两位相反
                for( let i = 0; i < ans.length; i++ ) (i&1) && ( [ res[i], res[i^1] ] = [ res[i^1], res[i] ] )
                return res.join("")
            default:
                return this.toHex( num >>> 4, id + 4, `${ans}${(num & 0B1111) <= 9 ? (num & 0B1111) : list[ (num & 0B1111) - 10 ]  }` )
        }
    }

    //将一个位等于0反转为1后，所得到的最长位为1的字符串长度
    getReverseMax(num:number, before:number, after:number, max:number):number{
        switch(true){
            case max === 32:
                return max;
            case num === 0:
                //before === after 说明没有修改0为1，结果增加1
                return before === after ? max + 1 : max;
            case (num & 1) === 0:
                //碰到为0的位，重置before为0，after也重置为before+1
                return this.getReverseMax(num>>>1, 0, before+1, Math.max( max, before+1 ) );
            default:
                //碰到为1的位，before、after指针各+1
                return this.getReverseMax( num>>>1, ++before, ++after, Math.max( max, after ) )  
        }
    }

    *[Symbol.iterator](){
        yield* Object.getOwnPropertyNames(Bits.prototype).filter( row => row !== "constructor" )
    }

}

/*
    ;( async function(){
        const bits = Bits.getInstance()
        for( const row of bits )console.log( row )
    } )()
*/
export default Bits