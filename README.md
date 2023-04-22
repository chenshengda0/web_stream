# dev_stream

## prime(求质数)
```
abstract class IPrime{

    //挨筛法求质数
    abstract getPrime():Transferable
    
}
```

## Bit操作
```
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
```

